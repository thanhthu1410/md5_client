import { useSelector } from "react-redux";
import "./feature.scss"
import { useTranslation } from 'react-i18next';
import { StoreType } from "@/stores";
import { useNavigate } from "react-router-dom";
interface Categories {
  id: string;
  avatar: string;
  title: string
}
export default function Feature() {
  const { t } = useTranslation();
  const navigate = useNavigate()
  const categoriesStore = useSelector((store : StoreType) => store.categoryStore)
  return (
    <div className="feature">
       <div className="feature-container">
       <i className="fa-regular fa-chess-queen"></i>
       <h2> {t("feature")} </h2>
      
       <div className="feature-content">
        {
          categoriesStore.data?.map((item: Categories) => (
            <div key={Math.random() * Date.now()} className="feature-item bg-image hover-zoom"  onClick={() => navigate(`shop/${item.id}`)}>
            <img src={item.avatar} alt="" className="w-100"/>
            <button className="btn-98">{item.title}</button>
        </div>
          ))
        }
          

       </div>
       <div className="delivery">
        <h2>{t("directly")}</h2>
        <p>{t("directly_content")}</p>
       </div>
         <img src="/images/last.webp" alt="" />
       </div>
      
    </div>
  )
}
