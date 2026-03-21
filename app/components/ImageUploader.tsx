"use client";

import { useRef } from "react";

type Props = {
    image: File | null;
    setImage: (file: File | null) => void;
};

export default function ImageUploader({ image, setImage }: Props) {
    const fileInputRef = useRef<HTMLInputElement>(null);

    const handleFile = (file: File) => {

        const allowedTypes = [
            "image/jpeg",
            "image/jpg",
            "image/png",
            "image/webp"
        ];

        if (!allowedTypes.includes(file.type)) {
            alert("Only image files (JPG, PNG, WEBP) are allowed.");
            return;
        }

        setImage(file);
    };
    const handleChange = (e: any) => {
        const file = e.target.files?.[0];
        if (file) handleFile(file);
    };

    const handleDrop = (e: any) => {
        e.preventDefault();
        const file = e.dataTransfer.files?.[0];
        if (file) handleFile(file);
    };

    return (
        <div>

            <label className="block text-sm font-medium text-gray-700 mb-2">
                Upload Evidence Photo <span className="text-red-500">*</span>
            </label>

            <div
                onDragOver={(e) => e.preventDefault()}
                onDrop={handleDrop}
                className="border-2 border-dashed rounded-lg p-6 text-center bg-gray-50"
            >
                <p className="text-sm text-gray-500 mb-3">
                    Drag & drop photo here or use the buttons below
                </p>

                <div className="flex justify-center gap-3 flex-wrap">

                    <button
                        type="button"
                        onClick={() => fileInputRef.current?.click()}
                        className="bg-blue-600 text-white px-4 py-2 rounded-md text-sm hover:bg-blue-700"
                    >
                        Upload Image
                    </button>

                    <button
                        type="button"
                        onClick={() => fileInputRef.current?.click()}
                        className="bg-gray-200 px-4 py-2 rounded-md text-sm hover:bg-gray-300"
                    >
                        Take Photo
                    </button>

                </div>

                <input
                    ref={fileInputRef}
                    type="file"
                    accept="image/png, image/jpeg, image/jpg, image/webp"
                    capture="environment"
                    onChange={handleChange}
                    className="hidden"
                    required
                />
                <p className="text-xs text-gray-400 mt-2">
                    Allowed formats: JPG, PNG, WEBP
                </p>
                <p className="text-xs text-gray-400 mt-3">
                    Photo evidence is required to verify pollution issues.
                </p>

                {image && (
                    <div className="mt-4">

                        <img
                            src={URL.createObjectURL(image)}
                            alt="preview"
                            className="max-h-48 mx-auto rounded-md shadow"
                        />

                        <button
                            type="button"
                            onClick={() => setImage(null)}
                            className="text-red-500 text-sm mt-2"
                        >
                            Remove image
                        </button>

                    </div>
                )}

            </div>

        </div>
    );
}