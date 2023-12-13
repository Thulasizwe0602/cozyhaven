import { useState } from "react";
import { Link, Navigate, useParams } from "react-router-dom";
import IndoorFeatures from "../components/IndoorFeatures";
import OutdoorFeatures from "../components/OutdoorFeatures";
import PhotoUploader from "../components/PhotoUploader";
import axios from "axios";

export default function AccomodationPage() {
    const { action } = useParams();
    const [formData, setFormData] = useState({
        title: '',
        address: '',
        description: '',
        extraInfo: '',
        checkIn: '',
        checkOut: '',
        maxGuest: 3,
        photoLink: '',
        addedPhotos: [],
        indoorFeatures: [],
        outdoorFeatures: [],
    });

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

    async function addNewAccomodation(event){
        event.preventDefault();        

        try {
            const {data} = await axios.post('/addAccomodation', formData);

            if (data.data._id !== ""){
                <Navigate to='/account/accomodations'/>
            }
        } catch (error) {
            console.log(error);
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
                    <form onSubmit={addNewAccomodation}>
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
                        <PhotoUploader
                          formData={formData}
                          handleChange={handleChange}
                          addPhotoByLink={addPhotoByLink}
                          uploadPhoto={uploadPhoto}
                        />
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