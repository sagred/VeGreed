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
import {
  Select,
  SelectContent,
  SelectGroup,
  SelectItem,
  SelectLabel,
  SelectTrigger,
  SelectValue,
} from "components/ui/select";
import { BigNumber } from "ethers";
import React, { useEffect, useState } from "react";
import { v4 as uuidv4 } from "uuid";
import { utils } from "ethers";
import QRCode from "react-qr-code";

const CONTRACT = process.env.NEXT_PUBLIC_CONTRACT_ADDRESS;

const Page = () => {
  const address = useAddress();
  // Define state variables
  const [selectedProvider, setSelectedProvider] = useState("");
  const [fee, setFee] = useState("8.99");

  const { contract } = useContract(CONTRACT);

  const { data, isLoading } = useContractRead(contract, "providerCount", []);

  const [count, setCount] = useState(0);

  const [providersAddresses, setProvidersAddresses] = useState([]);

  const [proof, setProof] = useState(null);

  const [loading, setLoading] = useState(false);

  useEffect(() => {
    if (data !== undefined) {
      const num = BigNumber.from(data?._hex).toNumber();
      setCount(num);
    }
  }, [data]);

  console.log(data);

  const { mutateAsync: createStream, isLoading: writeLoading } =
    useContractWrite(contract, "createStream");

  const handleProviderSelect = async (value: any) => {
    setSelectedProvider(value);
  };

  const claimId = (id: any) => {
    const url = "https://239e-208-123-173-93.ngrok-free.app/claim";
    const body = {
      userId: id,
      isNotUser: true,
    };

    try {
      const response = fetch(url, {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
        },
        body: JSON.stringify(body),
      });

      if (!response?.ok) {
        throw new Error(`HTTP error! Status: ${response.status}`);
      }

      const data = response?.json();
      console.log("Success:", data);
    } catch (error) {
      console.error("Error:", error);
    }
  };

  async function createIdentity() {
    const url = "https://239e-208-123-173-93.ngrok-free.app/identity";
    const body = {
      didMetadata: {
        method: "polygonid",
        blockchain: "polygon",
        network: "mumbai",
      },
    };

    try {
      const response = await fetch(url, {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
        },
        body: JSON.stringify(body),
      });

      if (!response.ok) {
        throw new Error(`HTTP error! Status: ${response.status}`);
      }

      const data = await response.json();
      console.log(data);
      claimId(data.id);
      setProof(data);

      //claimId(data);
    } catch (error) {
      console.error("Error:", error);
    }

    setLoading(false);
  }

  const handleSubscribe = async () => {
    setLoading(true);
    // console.log(selectedProvider);
    // try {
    //   const data = await createStream({
    //     args: [1, "sagred"],
    //     overrides: {
    //       value: utils.parseEther("0.1"),
    //     },
    //   });

    //   console.log(data);
    //   console.info("contract call successs", data);
    // } catch (err) {
    //   console.error("contract call failure", err);
    // }

    createIdentity();
  };

  const handleDownload = () => {
    const blob = new Blob([JSON.stringify(proof, null, 2)], {
      type: "application/json",
    });
    const link = document.createElement("a");
    link.href = window.URL.createObjectURL(blob);
    link.download = "proof.json";
    link.click();
  };

  return (
    <div className="w-full flex flex-col min-h-screen bg-black bg-dotted-spacing-4 bg-dotted-[#242424]">
      <div className="flex max-w-xl min-w-max justify-around mx-auto mt-32">
        <div className="z-10">
          <div className="group relative m-2 rounded-sm opacity-100">
            <div className={`absolute -inset-2  opacity-100  blur-3xl`}>
              <img src="images/mask.png" className="w-96" />
            </div>
            <div className="items-top relative flex justify-start leading-none">
              <div className="flex items-center justify-center ">
                <h1
                  className={`text-6xl max-w-2xl text-center font-black mb-6`}
                >
                  <img src="images/mask.png" className="w-96" />
                </h1>
              </div>
            </div>
          </div>
        </div>
        <div className="p-20">
          <h1 className="text-5xl font-black text-white">Subscribe</h1>
          <span className="opacity-60">
            <p className="text-white  mt-10 text-2xl">connect your wallet</p>
            <p className="text-white text-2xl">select your fav provider</p>
            <p className="text-white text-2xl">make payment</p>
            <p className="text-white text-2xl">download Proof</p>
            <p className="text-white text-2xl">
              {"upload proof in the provider's application"}
            </p>
          </span>
          <div className="flex mt-14">
            <p className="text-white text-2xl font-bold">just 5 steps...</p>
          </div>
        </div>
      </div>

      <div className="w-full mt-32 flex items-center justify-center">
        <Card>
          <CardHeader className="space-y-1">
            <CardTitle className="text-2xl">Subscriber Registration</CardTitle>
            <CardDescription>
              Connect your wallet and make payment to subscribe
            </CardDescription>
          </CardHeader>
          {proof ? (
            <CardContent className="grid gap-4">
              <Button className="w-full" onClick={handleDownload}>
                Download Proof{" "}
              </Button>

              <div
                style={{
                  height: "auto",
                  margin: "0 auto",
                  maxWidth: 256,
                  width: "100%",
                }}
                onClick={() => alert("You have been successfully verified")}
              >
                <QRCode
                  size={256}
                  style={{ height: "auto", maxWidth: "100%", width: "100%" }}
                  value={proof}
                  viewBox={`0 0 256 256`}
                />
              </div>
            </CardContent>
          ) : (
            <>
              <CardContent className="grid gap-4">
                <div className="grid gap-2">
                  <Label htmlFor="provider">Select Provider</Label>
                  <Select>
                    <SelectTrigger>
                      <SelectValue placeholder="Select a Provider" />
                    </SelectTrigger>
                    <SelectContent>
                      <SelectGroup>
                        <SelectLabel>Provider</SelectLabel>
                        {[...Array(count)].map((_, i) => {
                          return (
                            <ProviderList
                              key={i}
                              num={i + 1}
                              providerAddresses
                              handleProviderSelect={handleProviderSelect}
                            />
                          );
                        })}
                      </SelectGroup>
                    </SelectContent>
                  </Select>
                </div>
                <div className="grid gap-2">
                  <Label htmlFor="url">Fee or fee/month</Label>
                  <Input id="url" value={fee} type="url" disabled />
                </div>
              </CardContent>
              <CardFooter>
                <Button className="w-full" onClick={handleSubscribe}>
                  {loading ? (
                    <span className="animate-spin">
                      <Icons.spinner />
                    </span>
                  ) : (
                    <>Subscribe</>
                  )}
                </Button>
              </CardFooter>
            </>
          )}
        </Card>
      </div>
      <div className="my-20 max-w-xl mx-auto">
        <h1 className="text-xl font-bold mb-10"> Active Subscriptions</h1>
        <div className="flex space-x-8">
          <Card className="w-fit ">
            <CardHeader className="space-y-1">
              <CardTitle className="text-2xl">Netflix</CardTitle>
              <CardDescription>https://netflix.com</CardDescription>
            </CardHeader>
            <CardContent className="grid gap-4">8.99</CardContent>
            <CardFooter>
              <div className="space-x-2 flex">
                <Button className="w-full">Renew</Button>
                <Button className="w-ful" variant={"ghost"}>
                  Cancel
                </Button>
              </div>
            </CardFooter>
          </Card>

          <Card className="w-fit ">
            <CardHeader className="space-y-1">
              <CardTitle className="text-2xl">Fans</CardTitle>
              <CardDescription>https://fans.com</CardDescription>
            </CardHeader>
            <CardContent className="grid gap-4">9.99</CardContent>
            <CardFooter>
              <div className="space-x-2 flex">
                <Button className="w-full">Renew</Button>
                <Button className="w-ful" variant={"ghost"}>
                  Cancel
                </Button>
              </div>
            </CardFooter>
          </Card>

          <Card className="w-fit ">
            <CardHeader className="space-y-1">
              <CardTitle className="text-2xl">Plus +</CardTitle>
              <CardDescription>https://plus.com</CardDescription>
            </CardHeader>
            <CardContent className="grid gap-4">5.99</CardContent>
            <CardFooter>
              <div className="space-x-2 flex">
                <Button className="w-full">Renew</Button>
                <Button className="w-ful" variant={"ghost"}>
                  Cancel
                </Button>
              </div>
            </CardFooter>
          </Card>
        </div>
      </div>
    </div>
  );
};

const ProviderList = ({
  num,
  providerAddresses,
  handleProviderSelect,
}: any) => {
  const { contract } = useContract(CONTRACT);
  const { data, isLoading } = useContractRead(contract, "providerIdToAddress", [
    num,
  ]);

  const { data: provider } = useContractRead(contract, "providers", [data]);

  if (provider) {
    const id = BigNumber.from(provider?.id?._hex).toNumber();
    return (
      <SelectItem
        value={provider.name}
        onClick={() => handleProviderSelect(id)}
      >
        {provider.name}
      </SelectItem>
    );
  } else {
    return null;
  }
};

export default Page;
