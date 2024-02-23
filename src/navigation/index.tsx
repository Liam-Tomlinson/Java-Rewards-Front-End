import { useAuth } from "../../utils/useAuth";
import UserStack from "./userStack";
import AuthStack from "./authStack";
import { useAccountContext } from "../contexts/AccountContext";
import BusinessStack from "./BusinessStack";

export default function RootNavigation() {
  const { user } = useAuth();
  const {accountType} = useAccountContext()
  if (user && accountType === "Business") {
    return <BusinessStack />
  } else if (user && user.email === 'Customer') {
    return <UserStack />
  } else {
    return <AuthStack/>
  }

  // if (user && user.email === "mancunianbrew@example.com") {
  //   return <BusinessStack />
  // } else if (user && user.email === 'simon@test.com') {
  //   return <UserStack />
  // } else {
  //   return <AuthStack/>
  // }

}