import { useState, useEffect } from "react";
import Banner from "../../components/banner/Banner";
import Category from "../../components/category/Category";
import Modal from "../../components/modal/Modal";
import categoryData from "../../data/CategoryData";
import { useVideoContext } from "../../contexts/VideoContext";
import Loading from "../../components/loading/Loading"; 

function Home() {
    const { videos, deleteVideo, updateVideo } = useVideoContext();
    const [categories, setCategories] = useState([]);
    const [bannerCard, setBannerCard] = useState(null);
    const [modalOpen, setModalOpen] = useState(false);
    const [currentCard, setCurrentCard] = useState(null);
    const [categoryLookup, setCategoryLookup] = useState({});
    const [isLoading, setIsLoading] = useState(true); 

    useEffect(() => {
        setCategories(categoryData);
    }, []);

    useEffect(() => {
        console.log(videos);
        if (videos.length > 0) {
            // Convertir el id de cada video a número antes de asignarlo
            const videoWithNumberIds = videos.map(video => ({
                ...video,
                id: Number(video.id),
            }));
            setBannerCard(videoWithNumberIds[0]);
            setIsLoading(false);
        } else {
            setIsLoading(true);
        }
    }, [videos]);

    useEffect(() => {
        const lookup = {};
        categories.forEach(category => {
            lookup[category.name] = category;
        });
        setCategoryLookup(lookup);
    }, [categories]);

    const handleCardClick = (card) => {
        setBannerCard(card);
        const bannerElement = document.getElementById('banner');
        if (bannerElement) {
            bannerElement.scrollIntoView({ behavior: 'smooth' });
        }
    };

    const handleCardDelete = (cardId) => {
        deleteVideo(cardId);
        if (bannerCard && bannerCard.id === cardId && videos.length > 0) {
            setBannerCard(videos[0]);
        } else if (videos.length === 0) {
            setBannerCard(null);
        }
    };

    const handleCardEdit = (card) => {
        setCurrentCard(card);
        setModalOpen(true);
    };

    const handleModalClose = () => {
        setModalOpen(false);
    };

    const handleModalSave = (updatedCard) => {
        updateVideo(updatedCard);
        setModalOpen(false);
    };

    return (
        isLoading ?
            <Loading /> :
            <div className="home-container">
                {bannerCard && <Banner card={bannerCard} categoryLookup={categoryLookup} />}
                {categories.map(category => (
                    <Category
                        key={category.id}
                        datos={category}
                        cards={videos
                        .filter(card => card.category === category.name)
                        .map(card => ({
                        ...card,
                        id: Number(card.id), // Asegúrate de convertir el id a número
        }))
    }
    onCardClick={handleCardClick}
    onCardDelete={handleCardDelete}
    onCardEdit={handleCardEdit}
/>

                ))}
                <Modal
                    card={currentCard}
                    isOpen={modalOpen}
                    onClose={handleModalClose}
                    onSave={handleModalSave}
                />
            </div>
    );
}

export default Home;
