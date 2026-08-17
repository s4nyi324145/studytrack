import { signUp } from "@/lib/auth-client";

export const registerUser = async (userData: { firstName: string; lastName: string; email: string; password: string }) => {
  try {
    
    await signUp.email({
      name: userData.firstName + ' ' + userData.lastName,
      email: userData.email,
      password: userData.password,
    }, {
        onSuccess: (session) => {
          console.log('User registered successfully:', session);
        },
        onError: (error) => {
          console.error('Error registering user:', error);
        },
        
    });


  } catch (error) {
    console.error('Error registering user:', error);
    throw error;
  }
}