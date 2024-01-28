// import { useEffect, useState } from "react"
// import { supabase } from "../../supabaseClient"
// type Props = {}

// export default function PostUpload({}: Props) {
//   const [uploading, setUploading] = useState<boolean>(false)
    
//   async function update()

//   async function uploadPostImage(event: any) {
//     try {
//       setUploading(true)

//       if (!event.target.files || event.target.files.length === 0) {
//         throw new Error('You must select an image to upload')
//       }

//       const file = event.target.files[0]
//       const fileExt = file.name.split('.').pop()
//       const fileName = `${Math.random()}.${fileExt}`
//       const filePath = `${fileName}`

//       const { error: uploadError } = await supabase.storage.from('')
    
//       if (uploadError) {
//         throw uploadError
//       }

      
//     }
//   }

//   return (
//     <div>
  
//     </div>
//   )
// }