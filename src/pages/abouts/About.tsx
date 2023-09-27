import "./about.scss"
import { useTranslation } from 'react-i18next';
export default function About() {
    const { t } = useTranslation();
  return (
    <div className="about">
        <div className="about-bn">
            <img src="/images/about1.webp" alt="" />
            <p className="about-title">
                <h3>{t("about_title")}</h3>
                <p>{t("about_content")}.</p>
            </p>
        </div>
        <div className="about-content">
            <div className="about-item">
               <img src="https://i.pinimg.com/564x/27/b2/8e/27b28e675ba449bab8f0d3e442d09b86.jpg" alt="" />
               <div className="content-detail">
                <h5>{t("about_title1")}</h5>
                    <p> {t("about_content2")}</p>
                    <h5>{t("about_title2")}</h5>
                    <p> {t("about_content3")}</p>
                    <h5>{t("about_title3")}</h5>
                    <p> {t("about_content4")}</p>
                </div>
            </div>
            <div className="about-last">
                <img src="https://i.pinimg.com/564x/59/48/4f/59484f7e231f4513f096ac9242adb9bf.jpg" alt="" />
                <img src="https://i.pinimg.com/564x/f9/ca/28/f9ca28f16a3b39015ed4a4794b049a08.jpg" alt="" />
    <img src="https://i.pinimg.com/564x/a9/1a/72/a91a72cb9e23edb97f7b8d9c57fbc0f7.jpg" alt="" />
            </div>
        </div>
    </div>
  )
}
