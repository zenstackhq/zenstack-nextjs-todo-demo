import React, { useState } from "react";
import { getCsrfToken, signIn } from "next-auth/react";
import {
  Text,
  Button,
  Input,
  Tabs,
  TabList,
  TabPanels,
  Tab,
  TabPanel,
  ChakraProvider,
  Alert,
  AlertDescription,
  AlertIcon,
  AlertTitle,
} from "@chakra-ui/react";
import { GetServerSideProps } from "next";
import { useUser } from "@zenstackhq/runtime/hooks";
import Router, { useRouter } from "next/router";

const Login: React.FC<{ csrfToken: string }> = ({ csrfToken }) => {
  const [name, setName] = useState("");
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");

  const { create: signup } = useUser();

  const router = useRouter();
  const error = router.query["error"];

  const submitData = async (e: React.SyntheticEvent) => {
    e.preventDefault();
    try {
      await signup({
        data: {
          email,
          name,
          password,
        },
      });

      const signInResult = await signIn("credentials", {
        redirect: false,
        email,
        password,
      });
      if (signInResult?.ok) {
        await Router.push("/");
      } else {
        console.error("Signin failed:", signInResult?.error);
      }
    } catch (error) {
      console.error(error);
      alert("This email has been registered");
    }
  };
  return (
    <ChakraProvider>
      {error && (
        <Alert status="error" alignItems="center" justifyContent="center" textAlign="center">
          <AlertIcon />
          <AlertTitle>Sign in failed. Check the details you provided are correct.</AlertTitle>
        </Alert>
      )}
      <div className="flex justify-center items-center h-screen bg-gray-100">
        <Tabs className="w-96 p-5 border rounded-lg bg-white">
          <Text fontSize="3xl" textAlign="center" className="py-8" fontWeight="extrabold">
            Todo App
          </Text>
          <TabList>
            <Tab>Log In</Tab>
            <Tab>Sign Up</Tab>
          </TabList>

          <TabPanels>
            <TabPanel>
              <form className="space-y-5" action="/api/auth/callback/credentials" method="POST">
                <Input size="lg" type="hidden" name="csrfToken" value={csrfToken} />
                <div>
                  <Input
                    size="lg"
                    name="email"
                    id="input-email-for-credentials-provider"
                    type="text"
                    placeholder="Email address"
                  />
                </div>
                <div>
                  <Input
                    size="lg"
                    name="password"
                    id="input-password-for-credentials-provider"
                    type="password"
                    placeholder="Your password"
                  />
                </div>
                <Button colorScheme="blue" size="lg" className="w-full" type="submit">
                  Log In
                </Button>
              </form>
            </TabPanel>
            <TabPanel>
              <form className="space-y-5" onSubmit={submitData}>
                <div>
                  <Input autoFocus onChange={(e) => setName(e.target.value)} size="lg" type="text" placeholder="Name" />
                </div>
                <div>
                  <Input
                    onChange={(e) => setEmail(e.target.value)}
                    size="lg"
                    id="input-email-for-new"
                    type="text"
                    placeholder="Email address"
                  />
                </div>
                <div>
                  <Input
                    onChange={(e) => setPassword(e.target.value)}
                    size="lg"
                    type="password"
                    placeholder="Your password"
                  />
                </div>
                <Button
                  disabled={!name || !email || !password}
                  colorScheme="blue"
                  size="lg"
                  className="w-full"
                  type="submit"
                >
                  Sign Up
                </Button>
              </form>
            </TabPanel>
          </TabPanels>
        </Tabs>
      </div>
    </ChakraProvider>
  );
};

export default Login;

export const getServerSideProps: GetServerSideProps<{ csrfToken: string | undefined }> = async (context) => {
  const csrfToken = await getCsrfToken(context);
  return {
    props: {
      csrfToken,
    },
  };
};
