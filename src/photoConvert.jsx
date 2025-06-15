import React, { useState } from "react";
import axios from "axios";

export default function PhotoConverter() {
  const [image, setImage] = useState(null);
  const [previewUrl, setPreviewUrl] = useState(null);
  const [format, setFormat] = useState("jpeg");
  const [width, setWidth] = useState(800);
  const [height, setHeight] = useState(600);
  const [unit, setUnit] = useState("px");
  const [dpi, setDpi] = useState(72);
  const [result, setResult] = useState(null);
  const [targetSizeKB, setTargetSizeKB] = useState('');

  const handleImageChange = (e) => {
    const file = e.target.files[0];
    if (file) {
      setImage(file);
      setPreviewUrl(URL.createObjectURL(file));
    }
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    if (!image) return alert("Please upload an image");

    const formData = new FormData();
    formData.append("image", image);
    formData.append("format", format);
    formData.append("width", width);
    formData.append("height", height);
    formData.append("unit", unit);
    formData.append("dpi", dpi);
    formData.append("targetSizeKB", targetSizeKB);

    try {
      const res = await axios.post("https://photoback-8ul9.onrender.com/convert", formData);
      setResult(res.data);
    } catch (err) {
      alert("Error converting image");
      console.error(err);
    }
  };

  return (
    <div className="p-6 max-w-xl mx-auto bg-slate-300">
      <h1 className="text-3xl font-bold mb-10 text-center">Photo Format & Size Converter</h1>

      <form onSubmit={handleSubmit} className="space-y-4 flex flex-col items-center">
        {/* Upload Box */}
        <div className="w-[400px] h-[200px] border-2 border-dashed border-gray-400 flex items-center justify-center bg-gray-100 mb-3">
          {previewUrl ? (
            <img src={previewUrl} alt="Preview" className="object-contain w-full h-full" />
          ) : (
            <p className="text-gray-500 text-sm text-center px-2">No image selected</p>
          )}
        </div>

        {/* File Input */}
        <div className="flex flex-col gap-4 mb-6">
          <input type="file" accept="image/*" onChange={handleImageChange} className="mt-2" />
          <div className="flex justify-center gap-7">
            {/* Format */}
            <div className="flex gap-2 items-center">
              <label>Format:</label>
              <select value={format} onChange={(e) => setFormat(e.target.value)} className="border px-2 py-1">
                <option value="jpeg">JPG</option>
                <option value="png">PNG</option>
                <option value="webp">WEBP</option>
              </select>
            </div>

            {/* Target Size */}
            <div className="flex gap-2 items-center">
              <label>Target Size (KB):</label>
              <input
                type="number"
                value={targetSizeKB}
                onChange={(e) => setTargetSizeKB(e.target.value)}
                className="border p-1 w-24"
              />
            </div>
          </div>  

          {/* Width, Height, Unit */}
          <div className="flex gap-2 items-center">
            <label>Width:</label>
            <input type="number" value={width} onChange={(e) => setWidth(e.target.value)} className="border p-1 w-24" />
            <label>Height:</label>
            <input type="number" value={height} onChange={(e) => setHeight(e.target.value)} className="border p-1 w-24" />
            <select value={unit} onChange={(e) => setUnit(e.target.value)} className="border px-2 py-1">
              <option value="px">px</option>
              <option value="inch">inch</option>
              <option value="cm">cm</option>
            </select>
          </div>

          {/* DPI */}
          <div className="flex gap-2 items-center">
            <label>Resolution (DPI):</label>
            <input type="number" value={dpi} onChange={(e) => setDpi(e.target.value)} className="border p-1 w-24" />
          </div>
        </div>
        {/* Submit Button */}
        <button type="submit" className="bg-blue-600 text-white px-4 py-2 rounded w-full mt-8">Convert</button>
      </form>

      {/* Result Preview */}
      {result && (
        <div className="mt-6 text-center">
          <h2 className="text-lg font-semibold mb-2">Converted Image</h2>
          <img
            src={`https://photoback-8ul9.onrender.com${result.downloadUrl}`}
            alt="Converted"
            className="border w-full max-w-md mx-auto"
          />
          <p className="mt-2">Size: {result.sizeKB} KB ({result.sizeMB} MB)</p>
          <a
            href={`https://photoback-8ul9.onrender.com/download/${result.downloadUrl.split('/').pop()}`}
            className="bg-green-600 text-white px-4 py-2 rounded inline-block mt-2"
            download
          >
            Download Image
          </a>
        </div>
      )}
    </div>
  );
}
