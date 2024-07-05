import { useContext } from 'react';
import { PictureContext } from '../../context/PicturesContext';
import { IconCompress, IconPhotoStack, IconRefresh, IconsHome } from '../../components/IconsCompononents/IconsComponents';
import { Menu } from '../../components/navigation/menu/Menu';
import { Routes, Route } from 'react-router-dom';
import waveTop from '../../assets/svg/WaveTop.svg';
import {GenericPictureForm} from '../../components/genericPictureForm/GenericPictureForm';
import {ImgComparator} from '../../components/imageComparator/ImgComparator';
import {InfoPicture} from '../../components/infoPicture/InfoPicture';
import {AddPicture} from '../../components/addPicture/AddPicture';
import { useImageProcessing } from '../../utils/hooks/useImageProcessing';

const navData = [
    { id: "Accueil", name: "menu", link: "/application", icon: <IconsHome /> },
    { id: "Convertir", name: "menu", link: "/application/convert", icon: <IconRefresh />},
    { id: "Compresser", name: "menu", link: "/application/compress", icon: <IconCompress />},
    { id: "Multi-Size", name: "menu", link: "/application/multi-size", icon: <IconPhotoStack />},
];

export const Application = () => {
    const {
        images,
        reponse,
        setImages,
        quality,
        sizes,
        originalPictureProperty,
        comparedImageProperty,
        resetPictures,  downloadUrl, downloadUrls,
      } = useContext(PictureContext);
    
      const { isLoading, onReset } =
        useImageProcessing(images, quality, sizes);

    const onCancel = () => {
        onReset();
        resetPictures();
    };
console.log("reponse", reponse)
    return (
        <section id="application" className="application">
            <img className="home__container-border" src={waveTop} alt="" />
            <div className="application__dashboard">
                <div className='application__dashboard-sidebar'>
                    <Menu navData={navData} />
                    <Routes>
                        <Route path="convert" element={<GenericPictureForm config={{
                            testId: "convert-picture",
                            title: "Convertir une image",
                            subtitle: "Convertissez simplement vos images au format webp.",
                            showQuality: false,
                            showSizes: false,
                        }} />} />
                        <Route path="compress" element={<GenericPictureForm config={{
                            testId: "compress-picture",
                            title: "Compresser une image",
                            subtitle: "Réduisez la taille de vos images tout en conservant la qualité.",
                            showQuality: true,
                            showSizes: false,
                        }} />} />
                        <Route path="multi-size" element={<GenericPictureForm config={{
                            testId: "multiSize-picture",
                            title: "Compression multi-tailles",
                            subtitle: "Compressez, redimensionner et convertissez vos images en plusieurs tailles.",
                            showQuality: true,
                            showSizes: true,
                        }} />} />
                        <Route path="*" element={<HomeDashboard />} />
                    </Routes>
                </div>
                <div className='application__dashboard-content'>
                    {reponse && images && !isLoading ? (
                        <>
                            <ImgComparator
                                original={URL.createObjectURL(images)}
                                compared={downloadUrls?.desktop?.url || downloadUrl}
                            />
                            <div className="application__picture-infos">
                                <InfoPicture
                                    pictureProperty={originalPictureProperty || {}}
                                    type="originale"
                                />
                                <InfoPicture
                                    pictureProperty={comparedImageProperty || {}}
                                    type="compressed"
                                />
                            </div>
                        </>
                    ) : (
                        <>
                            <AddPicture setImages={setImages} cancel={onCancel} />
                            {images && (
                                <div className="application__picture-infos">
                                    <InfoPicture
                                        pictureProperty={originalPictureProperty || {}}
                                        type="originale"
                                    />
                                </div>
                            )}
                        </>
                    )}
                </div>
            </div>
        </section>
    );
};

const HomeDashboard = () => {
    return (
        <section>
            <h1 className="application__title">Bienvenue !</h1>
            <p className="application__subtitle">
                - Déposer ou sélectionner une image.
            </p>
            <p className="application__subtitle">
                - Sélectionner une option dans le menu.
            </p>
        </section>
    );
};
