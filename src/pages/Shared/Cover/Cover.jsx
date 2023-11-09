
const Cover = ({ imageURL, title }) => {
    return (
        <div className="hero h-[400px] mb-4" style={{ backgroundImage: `url(${imageURL})` }}>
            <div className="hero-overlay bg-opacity-60"></div>
            <div className="hero-content text-center text-neutral-content">
                <div className="max-w-md">
                    <h1 className="mb-5 text-white text-5xl font-bold">{title}</h1>
                </div>
            </div>
        </div>
    );
};

export default Cover;