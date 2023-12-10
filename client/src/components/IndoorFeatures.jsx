export default function IndoorFeatures({selectedIndoor, onChange}) {
    return (
        <>
            <h2 className="text-2xl mt-4">Indoor Features</h2>
            <div className="mt-2 grid gap-2 grid-cols-2 md:grid-cols-3 lg:grid-cols-6">
                <label className="border p-4 flex round gap-2 items-center">
                    <input 
                        type="checkbox"
                        data-extra-info ="indoorFeatures"
                        name="wifi"
                        value= "Wifi – 47 Mbps"
                        checked={selectedIndoor.includes('Wifi – 47 Mbps')}
                        onChange={onChange}
                    />
                    <svg xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24" strokeWidth="1.5" stroke="currentColor" className="w-6 h-6">
                        <path strokeLinecap="round" strokeLinejoin="round" d="M8.288 15.038a5.25 5.25 0 017.424 0M5.106 11.856c3.807-3.808 9.98-3.808 13.788 0M1.924 8.674c5.565-5.565 14.587-5.565 20.152 0M12.53 18.22l-.53.53-.53-.53a.75.75 0 011.06 0z" />
                    </svg>
                    <span>Wifi – 47 Mbps</span>
                </label>
                <label className="border p-4 flex round gap-2 items-center">
                    <input
                        type="checkbox"
                        data-extra-info ="indoorFeatures"
                        name="kitchen"
                        value= "Kitchen"
                        checked={selectedIndoor.includes('Kitchen')}
                        onChange={onChange}
                        />
                    <svg xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24" strokeWidth="1.5" stroke="currentColor" className="w-6 h-6">
                        <path strokeLinecap="round" strokeLinejoin="round" d="M12 8.25v-1.5m0 1.5c-1.355 0-2.697.056-4.024.166C6.845 8.51 6 9.473 6 10.608v2.513m6-4.87c1.355 0 2.697.055 4.024.165C17.155 8.51 18 9.473 18 10.608v2.513m-3-4.87v-1.5m-6 1.5v-1.5m12 9.75l-1.5.75a3.354 3.354 0 01-3 0 3.354 3.354 0 00-3 0 3.354 3.354 0 01-3 0 3.354 3.354 0 00-3 0 3.354 3.354 0 01-3 0L3 16.5m15-3.38a48.474 48.474 0 00-6-.37c-2.032 0-4.034.125-6 .37m12 0c.39.049.777.102 1.163.16 1.07.16 1.837 1.094 1.837 2.175v5.17c0 .62-.504 1.124-1.125 1.124H4.125A1.125 1.125 0 013 20.625v-5.17c0-1.08.768-2.014 1.837-2.174A47.78 47.78 0 016 13.12M12.265 3.11a.375.375 0 11-.53 0L12 2.845l.265.265zm-3 0a.375.375 0 11-.53 0L9 2.845l.265.265zm6 0a.375.375 0 11-.53 0L15 2.845l.265.265z" />
                    </svg>
                    <span>Kitchen</span>
                </label>
                <label className="border p-4 flex round gap-2 items-center">
                    <input
                        type="checkbox"
                        data-extra-info ="indoorFeatures"
                        name="airConditioner"
                        value= "Air conditioning"
                        checked={selectedIndoor.includes('Air conditioning')}
                        onChange={onChange}
                        />
                    <svg xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24" strokeWidth="1.5" stroke="currentColor" className="w-6 h-6">
                        <path strokeLinecap="round" strokeLinejoin="round" d="M8.25 3v1.5M4.5 8.25H3m18 0h-1.5M4.5 12H3m18 0h-1.5m-15 3.75H3m18 0h-1.5M8.25 19.5V21M12 3v1.5m0 15V21m3.75-18v1.5m0 15V21m-9-1.5h10.5a2.25 2.25 0 002.25-2.25V6.75a2.25 2.25 0 00-2.25-2.25H6.75A2.25 2.25 0 004.5 6.75v10.5a2.25 2.25 0 002.25 2.25zm.75-12h9v9h-9v-9z" />
                    </svg>
                    <span>Air conditioning</span>
                </label>
                <label className="border p-4 flex round gap-2 items-center">
                    <input
                        type="checkbox"
                        data-extra-info ="indoorFeatures"
                        name="netflix"
                        value= "63 inch HDTV with Netflix"
                        checked={selectedIndoor.includes('63 inch HDTV with Netflix')}
                        onChange={onChange}
                        />
                    <svg xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24" strokeWidth="1.5" stroke="currentColor" className="w-6 h-6">
                        <path strokeLinecap="round" strokeLinejoin="round" d="M6 20.25h12m-7.5-3v3m3-3v3m-10.125-3h17.25c.621 0 1.125-.504 1.125-1.125V4.875c0-.621-.504-1.125-1.125-1.125H3.375c-.621 0-1.125.504-1.125 1.125v11.25c0 .621.504 1.125 1.125 1.125z" />
                    </svg>
                    <span>63 inch HDTV with Netflix</span>
                </label>
                <label className="border p-4 flex round gap-2 items-center">
                    <input
                        type="checkbox"
                        data-extra-info ="indoorFeatures"
                        name="gaming"
                        value= "Game console: PS4"
                        checked={selectedIndoor.includes('Game console: PS4')}
                        onChange={onChange}
                        />
                    <svg xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24" strokeWidth="1.5" stroke="currentColor" className="w-6 h-6">
                        <path strokeLinecap="round" strokeLinejoin="round" d="M6 20.25h12m-7.5-3v3m3-3v3m-10.125-3h17.25c.621 0 1.125-.504 1.125-1.125V4.875c0-.621-.504-1.125-1.125-1.125H3.375c-.621 0-1.125.504-1.125 1.125v11.25c0 .621.504 1.125 1.125 1.125z" />
                    </svg>
                    <span>Game console: PS4</span>
                </label>
                <label className="border p-4 flex round gap-2 items-center">
                    <input
                        type="checkbox"
                        data-extra-info ="indoorFeatures"
                        name="wash"
                        value= "Free washer – In building"
                        checked={selectedIndoor.includes('Free washer – In building')}
                        onChange={onChange}
                        />
                    <svg xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24" strokeWidth="1.5" stroke="currentColor" className="w-6 h-6">
                        <path strokeLinecap="round" strokeLinejoin="round" d="M6 20.25h12m-7.5-3v3m3-3v3m-10.125-3h17.25c.621 0 1.125-.504 1.125-1.125V4.875c0-.621-.504-1.125-1.125-1.125H3.375c-.621 0-1.125.504-1.125 1.125v11.25c0 .621.504 1.125 1.125 1.125z" />
                    </svg>
                    <span>Free washer – In building</span>
                </label>
            </div>
        </>
    )
}