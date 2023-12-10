import { useState } from "react";
import { Link, useParams } from "react-router-dom";
import IndoorFeatures from "../components/IndoorFeatures";
import OutdoorFeatures from "../components/OutdoorFeatures";
import axios from "axios";

export default function AccomodationPage() {
    const { action } = useParams();
    const [formData, setFormData] = useState({
        title: '',
        address: '',
        description: '',
        extraInfo: '',
        extraInfo: '',
        checkIn: '',
        checkOut: '',
        maxGuest: 3,
        photoLink: '',
        addedPhotos: [],
        indoorFeatures: [],
        outdoorFeatures: [],
    });
    // const [addedPhotos, setAddedPhotos] = useState([]);
    // const [indoorFeatures, setFeatures] = useState([]);
    //const [photoLink, setPhotoLink] = useState('');

    const handleChange = (e) => {
        const { name, value, type, checked, dataset } = e.target;

        if (type === 'checkbox') {
            setFormData((prevFormData) => {
              let componentName = dataset.extraInfo;
              
              switch(componentName){
                case'indoorFeatures':
                    let updatedIndoorFeatures = prevFormData.indoorFeatures;            
                    if (checked) {
                        updatedIndoorFeatures = [...prevFormData.indoorFeatures, value];
                    } else {
                        updatedIndoorFeatures = prevFormData.indoorFeatures.filter((feature) => feature !== value);
                    }

                    return {
                        ...prevFormData,
                        indoorFeatures: updatedIndoorFeatures,
                    };
                case'outdoorFeatures':
                    let updatedOutdoorFeatures = prevFormData.outdoorFeatures;
                    if (checked) {
                        updatedOutdoorFeatures = [...prevFormData.outdoorFeatures, value];
                    } else {
                        updatedOutdoorFeatures = prevFormData.outdoorFeatures.filter((feature) => feature !== value);
                    }
                    
                return {
                    ...prevFormData,
                    outdoorFeatures: updatedOutdoorFeatures,
                };
              }
            });
        } else {
            setFormData((prevData) => ({ ...prevData, [name]: value }));
        }
    };

    async function addPhotoByLink(event) {
        event.preventDefault();
        const { data: fileName } = await axios.post('/uploadByLink', { imageLink: formData.photoLink });
        if (fileName) {
            setFormData((prevFormData) => ({
                ...prevFormData,
                addedPhotos: [...prevFormData.addedPhotos, fileName],
                photoLink: '' // Optional: Clear the photoLink input after adding to the array
            }));
        }
    };

    async function uploadPhoto(event) {
        event.preventDefault();

        const files = event.target.files;
        const formData = new FormData();

        for (var i = 0; i < files.length; i++) {
            formData.append('photos', files[i])
        }
        const { data: fileNames } = await axios.post('/uploadPhotos', formData, {
            headers: { 'Content-Type': 'multipart/form-data' }
        });

        if (fileNames) {
            setFormData((prevFormData) => ({
                ...prevFormData,
                addedPhotos: [...prevFormData.addedPhotos,  ...fileNames],
                photoLink: '' // Optional: Clear the photoLink input after adding to the array
            }));

        }
    }

    return (
        <div>
            {action !== 'new' && (
                <div className="text-center">
                    <Link to={'/account/accomodations/new'} className="inline-flex  gap-2 bg-primary text-white py-2 px-6 rounded-full">
                        <svg xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24" strokeWidth="1.5" stroke="currentColor" className="w-6 h-6">
                            <path strokeLinecap="round" strokeLinejoin="round" d="M12 4.5v15m7.5-7.5h-15" />
                        </svg>
                        Add Accomodation
                    </Link>
                </div>

            )}
            {action === 'new' && (
                <div>
                    <form>
                        <h2 className="text-2xl mt-4">Title</h2>
                        <input
                            type="text"
                            name="title"
                            placeholder="Accomodation name, for example Cozy Haven"
                            value={formData.title}
                            onChange={handleChange}
                        />
                        <h2 className="text-2xl mt-4">Address</h2>
                        <input
                            type="text"
                            name="address"
                            placeholder="23 Saxon Boulevard"
                            value={formData.address}
                            onChange={handleChange}
                        />
                        <h2 className="text-2xl mt-4">Photos</h2>
                        <div className="flex gap-2">
                            <input
                                type="text"
                                name="photoLink"
                                placeholder="Add photo using a link"
                                value={formData.photoLink}
                                onChange={handleChange}
                            />
                            <button onClick={addPhotoByLink} className='bg-gray-100 px-2 rounded-2xl'>Upload&nbsp;Photo</button>
                        </div>
                        <div className="mt-2 gap-2 grid grid-cols-3 md:grid-cols-4 lg:grid-cols-6">
                            {formData.addedPhotos.length > 0 && formData.addedPhotos.map(imageLink => (
                                <div className="h-32 flex"key={imageLink}>
                                    <img className="rounded-2xl w-full object-cover" src={'http://localhost:3000/uploads/' + imageLink} />
                                </div>
                            ))}
                            <label className='h-32 w-30 cursor-pointer flex items-center gap-1 justify-center border bg-transparent rounded-2xl p-6  text-2xl text-primary'>
                                <input type='file' className="hidden" multiple onChange={uploadPhoto} />
                                <svg xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24" strokeWidth="1.5" stroke="currentColor" className="w-6 h-9">
                                    <path strokeLinecap="round" strokeLinejoin="round" d="M12 16.5V9.75m0 0l3 3m-3-3l-3 3M6.75 19.5a4.5 4.5 0 01-1.41-8.775 5.25 5.25 0 0110.233-2.33 3 3 0 013.758 3.848A3.752 3.752 0 0118 19.5H6.75z" />
                                </svg>
                                Upload
                            </label>
                        </div>
                        <h2 className="text-2xl mt-4">Description</h2>
                        <textarea
                            type="text"
                            name="description"
                            placeholder="A little more about your accomodation"
                            value={formData.description}
                            onChange={handleChange}
                        />
                        <IndoorFeatures selectedIndoor={formData.indoorFeatures} onChange={handleChange} />
                        <OutdoorFeatures selectedOutdoor={formData.outdoorFeatures} onChange={handleChange} />
                        <h2 className="text-2xl mt-4">Extra Info</h2>
                        <textarea
                            type="text"
                            name="extraInfo"
                            placeholder="A little more about accomodation rules"
                            value={formData.extraInfo}
                            onChange={handleChange}
                        />
                        <h2 className="text-2xl mt-4">Max guests & Check In & Out time </h2>
                        <div className="grid gap-2 sm:grid-cols-3">
                            <div>
                                <h3 className="text-xl mt-2 -mb-1">Max Guest</h3>
                                <input
                                    type="number"
                                    name="maxGuest"
                                    placeholder="3"
                                    value={formData.maxGuest}
                                    onChange={handleChange}
                                />
                            </div>
                            <div>
                                <h3 className="text-xl mt-2 -mb-1">Check In</h3>
                                <input
                                    type="text"
                                    name="checkIn"
                                    placeholder="15:00"
                                    value={formData.checkIn}
                                    onChange={handleChange}
                                />
                            </div>
                            <div>
                                <h3 className="text-xl mt-2 -mb-1">Check Out</h3>
                                <input
                                    type="text"
                                    name="checkOut"
                                    placeholder="09:00"
                                    value={formData.checkIn}
                                    onChange={handleChange}
                                />
                            </div>
                        </div>
                        <button className="primary my-4"> Save</button>
                    </form>
                </div>
            )}
        </div>
    );
}