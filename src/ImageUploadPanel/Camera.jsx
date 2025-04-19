import { useEffect, useRef, useState } from "react";

const Camera = () => {
  const [image, setImage] = useState(null);
  const videoRef = useRef(null);
  const [cameraActive, setCameraActive] = useState(false);
  const [cameraError, setCameraError] = useState(null);
  useEffect(() => {
    if (!videoRef.current) return;
    const cameraStart = async () => {
      try {
        const stream = await navigator.mediaDevices.getUserMedia({
          audio: true,
          video: true,
        });
        videoRef.current.srcObject = stream;
        setCameraActive(true);
        setCameraError(false);
      } catch (e) {
        setCameraError("Please allow camera access in your browser");
      }
    };
    cameraStart();
    return () => {
      if (videoRef?.current?.srcObject) {
        const tracks = videoRef.current.srcObject.getTracks();
        tracks.forEach((track) => track.stop());
      }
    };
  }, [videoRef]);
  const captureImage = () => {
    const canvas = document.createElement("canvas");
    const context = canvas.getContext("2d");
    const video = videoRef.current;
    if (video) {
      canvas.width = video.videoWidth;
      canvas.height = video.videoHeight;
      context.drawImage(video, 0, 0, canvas.width, canvas.height);
      //   based encodie 64
      const capturedImage = canvas.toDataURL("image/jpeg", 1.0);
      setImage(capturedImage);
    }
  };
  return (
    <div className="row my-5 offset-3">
      {cameraError && <div className="alert alert-danger">{cameraError}</div>}
      <video
        ref={videoRef}
        playsInline
        autoPlay
        className="mx-5 offset-4 col-6"
      ></video>
      {cameraActive ? (
        <div className="mx-5 my-5 ">
          <button
            className="btn btn-outline-primary px-5 my-2"
            onClick={captureImage}
          >
            Scan Now
          </button>
        </div>
      ) : (
        <p className="text-danger">Camera initializing...</p>
      )}
      {image && (
        <div className="mt-3">
          <h4>Captured Image:</h4>
          <img src={image} alt="Captured" />
        </div>
      )}
    </div>
  );
};
export default Camera;
