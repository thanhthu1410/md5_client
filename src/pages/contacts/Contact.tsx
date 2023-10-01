
import { useTranslation } from 'react-i18next';
import "./contact.scss"
export default function Contact() {
    const {t} = useTranslation()
    return (
        <div>
            <div className="banner-container">
                <div className="bannerProducts"></div>
                <div className="bannerProducts-over"></div>
                <div className='title-contact'>
                <h2>{t("bn_content")}</h2>
                <p>{t("bn_content_title")}</p>
                </div>
               
            </div>
            <div className='local'>
                <img src="https://firebasestorage.googleapis.com/v0/b/md05furniturestore.appspot.com/o/test%2Fcontact.png?alt=media&token=25c6e756-dc8c-4e49-9718-56aa382fb1a9&_gl=1*1w5uwyq*_ga*MTg1ODg5NjEyOS4xNjg4MDg4OTU3*_ga_CW55HF8NVT*MTY5NjA2Nzk2NC40OC4xLjE2OTYwNjc5ODEuNDMuMC4w" alt="" />
            </div>
            <div className='mapStore'>
            <iframe  src="https://www.google.com/maps/embed?pb=!1m18!1m12!1m3!1d250826.53427658955!2d106.38430168671874!3d10.7987025!2m3!1f0!2f0!3f0!3m2!1i1024!2i768!4f13.1!3m3!1m2!1s0x3175292b05c30a13%3A0x99a897cf24267664!2sOrigin%20Market!5e0!3m2!1svi!2s!4v1694236911675!5m2!1svi!2s"  loading="lazy" ></iframe>
            </div>
        </div>
    )
}
