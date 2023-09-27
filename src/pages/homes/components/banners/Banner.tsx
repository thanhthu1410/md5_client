import "./banner.scss"

export default function Banner() {
  return (
    <div>
      <video className="slide-video slide-video--desktop" playsInline={true} muted={true} loop={true} autoPlay={true}>
        <source src="/videos/intro.mp4" type="video/mp4" />
      </video>
    </div>
  )
}
