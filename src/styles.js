import image from './images/background_image.jpg';

export const styles = {
  paperContainer: {
    backgroundImage: `url(${image})`,
    backgroundSize: "cover",
  },
  boxContainer: {
    display: "flex",
    height: "100vh",
    alignItems: "center",
    justifyContent: "center",
  },
  contentContainer: {
    display: "flex",
    justifyContent: "center",
  },
  timerFont: {
    fontSize: "2.4rem",
  },
};
