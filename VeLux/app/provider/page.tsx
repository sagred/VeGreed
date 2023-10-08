"use client";

import {
  useAddress,
  useContract,
  useContractRead,
  useContractWrite,
} from "@thirdweb-dev/react";
import { Icons } from "components/icons";
import { Button } from "components/ui/button";
import {
  Card,
  CardContent,
  CardDescription,
  CardFooter,
  CardHeader,
  CardTitle,
} from "components/ui/card";
import { Input } from "components/ui/input";
import { Label } from "components/ui/label";
import React, { useEffect, useState } from "react";
import { utils } from "ethers";

const CONTRACT = process.env.NEXT_PUBLIC_CONTRACT_ADDRESS;

const Page = () => {
  const address = useAddress();

  const { contract } = useContract(CONTRACT);

  const { data, isLoading: isReadLoading } = useContractRead(
    contract,
    "providers",
    [address],
  );

  console.log(data);

  const { mutateAsync: createProvider, isLoading } = useContractWrite(
    contract,
    "createProvider",
  );

  // Define state variables
  const [name, setName] = useState("");
  const [providerUrl, setProviderUrl] = useState("");
  const [fee, setFee] = useState("8.99"); // This can be dynamic if needed

  useEffect(() => {}, []);

  const handleRegister = async () => {
    // Here you can call the contract method to register the provider with the state values
    try {
      const data = await createProvider({
        args: [name, providerUrl],
        overrides: {
          value: utils.parseEther("0.1"), // send 0.1 native token with the contract call
        },
      });
      console.info("contract call successs", data);
    } catch (err) {
      console.error("contract call failure", err);
    }
  };

  return (
    <div className="w-full flex flex-col min-h-screen bg-black bg-dotted-spacing-4 bg-dotted-[#242424]">
      <div className="flex max-w-xl min-w-max justify-around mx-auto mt-32">
        <div className="z-10">
          <div className="group relative m-2 rounded-sm opacity-100">
            <div className={`absolute -inset-2  opacity-100  blur-3xl`}>
              <img src="images/mask2.png" className="w-96" />
            </div>
            <div className="items-top relative flex justify-start leading-none">
              <div className="flex items-center justify-center ">
                <h1
                  className={`text-6xl max-w-2xl text-center font-black mb-6`}
                >
                  <img src="images/mask2.png" className="w-96" />
                </h1>
              </div>
            </div>
          </div>
        </div>
        <div className="p-20">
          <h1 className="text-5xl font-black text-white">Provider</h1>
          <span className="opacity-60">
            <p className="text-white  mt-10 text-2xl">connect your wallet</p>
            <p className="text-white text-2xl">register your service</p>
            <p className="text-white text-2xl">
              add auth component to your application
            </p>
            <p className="text-white text-2xl">verify user</p>
            <p className="text-white text-2xl">withdraw amount</p>
          </span>
          <div className="flex mt-14">
            <p className="text-white text-2xl font-bold">just 5 steps...</p>
          </div>
        </div>
      </div>
      <div className="w-full my-32 flex items-center justify-center">
        <Card>
          <CardHeader className="space-y-1">
            <CardTitle className="text-2xl">Provider Registration</CardTitle>
            <CardDescription>
              Connect your wallet and enter name to register{" "}
            </CardDescription>
          </CardHeader>
          <CardContent className="grid gap-4">
            <div className="grid gap-2">
              <Label htmlFor="name">Name</Label>
              <Input
                id="name"
                type="text"
                placeholder="Netflix"
                value={name}
                onChange={(e) => setName(e.target.value)} // Update name state on input change
              />
            </div>
            <div className="grid gap-2">
              <Label htmlFor="url">Provider URL</Label>
              <Input
                id="url"
                type="url"
                value={providerUrl}
                onChange={(e) => setProviderUrl(e.target.value)} // Update providerUrl state on input change
              />
            </div>
            <div className="grid gap-2">
              <Label htmlFor="fee">Fee or fee/month</Label>
              <Input
                id="fee"
                value={fee}
                type="text"
                disabled
                // If fee is dynamic, you can remove disabled and add onChange to update fee state
              />
            </div>
          </CardContent>
          <CardFooter>
            <Button className="w-full" onClick={handleRegister}>
              {isLoading ? (
                <span className="animate-spin">
                  <Icons.spinner />
                </span>
              ) : (
                <>Register Provider</>
              )}
            </Button>
          </CardFooter>
        </Card>
        {data?.name && data?.name !== " " && (
          <>
            <Card className="w-96 mx-4">
              <CardHeader className="space-y-1">
                <CardTitle className="text-2xl">{data.name}</CardTitle>
                <CardDescription>{data.url}</CardDescription>
              </CardHeader>
              <CardContent className="grid gap-4">
                <Button variant="default" className="w-fit">
                  Withdraw amount
                </Button>
              </CardContent>
              <CardFooter></CardFooter>
            </Card>
          </>
        )}
      </div>
    </div>
  );
};

export default Page;
