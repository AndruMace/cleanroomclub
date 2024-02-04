import { useRef } from 'react';

export const FileUploader = ({handleFiles}: {handleFiles: (files: File[]) => void}) => {
  
  // Create a reference to the hidden file input element
  const hiddenFileInput = useRef(null);
  
  // Programatically click the hidden file input element
  // when the Button component is clicked
  function handleClick (_event: any) {
    if (hiddenFileInput.current) (hiddenFileInput.current as any).click();
  };

  // function handleClick (event) {
  //   hiddenFileInput.current.click();
  // };

  // Call a function (passed as a prop from the parent component)
  // to handle the user-selected file 
  function handleChange (event: any) {
    if (!event.target.files || event.target.files.length === 0) {
      return;
    }

    handleFiles([...event.target.files]);
  };
return (
    <>
      <button className="hover:bg-emerald-500 hover:shadow-xl bg-emerald-200 text-emerald-800 rounded-md w-2/3 p-2 mx-auto my-3 shadow-sm border-emerald-300 border tansition duration-300" onClick={handleClick} type="button">
        Upload a file
      </button>
      <input
        type="file"
        onChange={handleChange}
        ref={hiddenFileInput}
        style={{display: 'none'}} 
        multiple
      />
    </>
  );
}