// Styles
import { styles } from "./styles";
// Components
import { ImageBackground } from "react-native";
// Images
import backgroundImg from "../../assets/background-galaxy.png";


interface Props {
  children: React.ReactNode;
}

export function Background({ children }: Props) {
  return (
    <ImageBackground source={backgroundImg} defaultSource={backgroundImg} style={styles.container}>
      {children}
    </ImageBackground>
  );
}
