import { Dispatch, SetStateAction } from "react";

export const getBase64 = (file: File, setCallback: Dispatch<SetStateAction<string>>) => {
    let reader = new FileReader();
    reader.readAsDataURL(file);
    reader.onload = function () {
      if(typeof reader.result == "string")
        setCallback(reader.result);
    };
    reader.onerror = function (error) {
        console.log('Error: ', error);
    };
}