import axios from "axios";

export function saveFile(fileData, fileName) {
  const a = document.createElement("a");
  a.href = URL.createObjectURL(fileData);
  a.download = fileName;
  const event = document.createEvent("MouseEvents");
  event.initMouseEvent(
    "click",
    true,
    false,
    window,
    0,
    0,
    0,
    0,
    0,
    false,
    false,
    false,
    false,
    0,
    null
  );
  a.dispatchEvent(event);
}

export async function uploadFile(fileData, fileName) {
  const formData = new FormData();
  formData.append("file", fileData, fileName);
  await axios.post("/upload", formData, {
    headers: {
      "Content-Type": "multipart/form-data"
    }
  });
}
