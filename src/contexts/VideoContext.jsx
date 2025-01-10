import { createContext, useState, useContext, useEffect } from 'react';
import PropTypes from 'prop-types';

const VideoContext = createContext();

export const useVideoContext = () => useContext(VideoContext);

export const VideoProvider = ({ children }) => {
    // Estado inicial con videos predefinidos
    const [videos, setVideos] = useState([
        { 
            id: 11, 
            title: 'Front-end vs. Back-end: ¡Descubre el lado perfecto para ti!', 
            category: "FRONT END VS BACK END", 
            photo: 'https://i.ytimg.com/vi/QjOWz9avkg8/maxresdefault.jpg', 
            link: 'https://www.youtube.com/embed/QjOWz9avkg8?si=YGZsHjm9czm9MmDe', 
            description: "¿Quieres saber más? Ve nuestros cursos: https://www.aluracursos.com/" },
    ]);

    const fetchVideos = async () => {
        try {
            const response = await fetch('http://localhost:3000/videos');
            const data = await response.json();
    
           
            const videosWithDescription = data.map(video => ({
                ...video,
                description: video.description || 'Descripción no disponible'
            }));
    
            setVideos(videosWithDescription);
        } catch (error) {
            console.error('Error fetching videos:', error);
        }
    };

    useEffect(() => {
        fetchVideos();
    }, []);

    const addVideo = (video) => {
        setVideos((prevVideos) => [...prevVideos, { ...video, id: prevVideos.length + 1 }]);
    };

    const updateVideo = (updatedVideo) => {
        setVideos((prevVideos) =>
            prevVideos.map((video) => (video.id === updatedVideo.id ? updatedVideo : video))
        );
    };

    const deleteVideo = (videoId) => {
        setVideos((prevVideos) => prevVideos.filter((video) => video.id !== videoId));
    };

    return (
        <VideoContext.Provider value={{ videos, addVideo, updateVideo, deleteVideo }}>
            {children}
        </VideoContext.Provider>
    );
};

VideoProvider.propTypes = {
    children: PropTypes.node.isRequired,
};
