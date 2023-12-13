import React from 'react';

const PhotoUploader = ({ formData, handleChange, addPhotoByLink, uploadPhoto }) => {
  return (
    <>
      <h2 className="text-2xl mt-4">Photos</h2>
      <div className="flex gap-2">
        <input
          type="text"
          name="photoLink"
          placeholder="Add photo using a link"
          value={formData.photoLink}
          onChange={handleChange}
        />
        <button onClick={addPhotoByLink} className="bg-gray-100 px-2 rounded-2xl">
          Upload&nbsp;Photo
        </button>
      </div>
      <div className="mt-2 gap-2 grid grid-cols-3 md:grid-cols-4 lg:grid-cols-6">
        {formData.addedPhotos.length > 0 &&
          formData.addedPhotos.map((imageLink) => (
            <div className="h-32 flex" key={imageLink}>
              <img className="rounded-2xl w-full object-cover" src={'http://localhost:3000/uploads/' + imageLink} alt="uploaded" />
            </div>
          ))}
        <label className="h-32 w-30 cursor-pointer flex items-center gap-1 justify-center border bg-transparent rounded-2xl p-6 text-2xl text-primary">
          <input type="file" className="hidden" multiple onChange={uploadPhoto} />
          <svg
            xmlns="http://www.w3.org/2000/svg"
            fill="none"
            viewBox="0 0 24 24"
            strokeWidth="1.5"
            stroke="currentColor"
            className="w-6 h-9"
          >
            <path strokeLinecap="round" strokeLinejoin="round" d="M12 16.5V9.75m0 0l3 3m-3-3l-3 3M6.75 19.5a4.5 4.5 0 01-1.41-8.775 5.25 5.25 0 0110.233-2.33 3 3 0 013.758 3.848A3.752 3.752 0 0118 19.5H6.75z" />
          </svg>
          Upload
        </label>
      </div>
    </>
  );
};

export default PhotoUploader;
