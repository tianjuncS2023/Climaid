import { NavigationContainer } from "@react-navigation/native";
import { Redirect} from "expo-router";
import RoleSelect from "./role-select";
import EditQuiz from "./(tabs)/editquiz";
import Jobs from "./(tabs)/jobs";
import TakeQuiz from "./(tabs)/takeQuiz";
import { createNativeStackNavigator } from '@react-navigation/native-stack';

const Stack = createNativeStackNavigator();

export default function Index() {
  return (
      <Stack.Navigator initialRouteName="role-select">
      <Stack.Screen name="role-select"
      component={RoleSelect}
      />
      <Stack.Screen
          name="jobs"
          component={Jobs}
          />
      <Stack.Screen
              name="editquiz"
              component={EditQuiz}
            />
            <Stack.Screen name="takequiz" component={TakeQuiz} />
      </Stack.Navigator>
  );
};
