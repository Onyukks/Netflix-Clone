import { useAuthStore } from "../../store/authUser"
import Authscreen from "./Authscreen"
import Homescreen from "./Homescreen"

const Home = () => {
  const {user} = useAuthStore()
  return (
    <>
        {
          user? <Homescreen /> : <Authscreen />
        }
    </>
      )
}

export default Home
