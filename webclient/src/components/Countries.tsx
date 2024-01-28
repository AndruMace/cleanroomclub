import { useEffect, useState } from "react";
import { createClient } from "@supabase/supabase-js";
import { Database, Tables } from '../../types/supabase'

const supabase = createClient<Database>("https://tecmtbjdqzaahwpxitki.supabase.co", "eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJpc3MiOiJzdXBhYmFzZSIsInJlZiI6InRlY210YmpkcXphYWh3cHhpdGtpIiwicm9sZSI6ImFub24iLCJpYXQiOjE3MDM4MDQ4MDEsImV4cCI6MjAxOTM4MDgwMX0.0NUOXLj41fQrlXW2auDm0BMRsoQ62GZuZF399VXgNBU");

function Countries() {
  const [countries, setCountries] = useState<Tables<'countries'>[]>([]);

  useEffect(() => {
    getCountries();
  }, []);

  async function getCountries() {
    const { data } = await supabase.from("countries").select();
    if (!data) return;

    setCountries(data);
  }

  return (
    <ul>
      {countries.map((country) => (
        <li key={country.name}>{country.name}</li>
      ))}
    </ul>
  );
}

export default Countries;