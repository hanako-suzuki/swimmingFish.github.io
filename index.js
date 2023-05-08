const medias = {
    audio: false,
    video: {
      facingMode: {
        exact: "environment"
      }
    }
  };
  const video = document.getElementById("video");
  video.autoplay = true;
  video.muted = true;
  video.playsInline = true;
  const canvas = document.getElementById("canvas");
  const ctx = canvas.getContext("2d");
  const promise = navigator.mediaDevices.getUserMedia(medias);
  
  const FPS = 30;
  
  promise.then(successCallback)
         .catch(errorCallback);
  
  function successCallback(stream) {
    video.srcObject = stream;
  
    let width = video.clientWidth;
    let height = video.clientHeight;
  
    canvas.width = width;
    canvas.height = height;

    const image = new Image();
    image.src = 'image/frame1.png';
  
    processVideo();
  
    function processVideo() {
      try{
        const begin = Date.now();
  
        if(width != video.clientWidth || height != video.clientHeight){
          width = video.clientWidth;
          height = video.clientHeight;
          canvas.width = width;
          canvas.height = height;
        }
  
        ctx.drawImage(video, 0, 0, width, height, 0, 0, canvas.width, canvas.height);
        ctx.drawImage(image , 0, 0, 480, 639, 0, 0, canvas.width, canvas.height);
  
        let delay = 1000 / FPS - (Date.now() - begin);
        if(delay<0){
            delay = 0;
        }
        setTimeout(processVideo, delay);
        
      }catch(e){
        location.reload();
      }
    }
  }
  
  function errorCallback(err) {
    alert(err);
  };