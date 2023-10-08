"use client";

import { useAddress, useContract, useContractWrite } from "@thirdweb-dev/react";
import { Button } from "components/ui/button";
import {
  Dialog,
  DialogContent,
  DialogDescription,
  DialogFooter,
  DialogHeader,
  DialogTitle,
  DialogTrigger,
} from "components/ui/dialog";
import { Input } from "components/ui/input";
import { Label } from "components/ui/label";
import { utils } from "ethers";
import Head from "next/head";
import Image from "next/image";
import { useState } from "react";
import QRCode from "react-qr-code";

interface Inputs {
  email: string;

  password: string;
}
const CONTRACT = process.env.NEXT_PUBLIC_VERIFICATION_CONTRACT_ADDRESS;

function Login() {
  const address = useAddress();

  const { contract } = useContract(CONTRACT);
  const [login, setLogin] = useState(false);

  const { mutateAsync: verifyTx, isLoading } = useContractWrite(
    contract,
    "verifyTx",
  );

  const handleRegister = async () => {
    try {
      const data = await verifyTx({
        args: [],
        overrides: {
          value: utils.parseEther("0.1"),
        },
      });
      console.info("contract call successs", data);
    } catch (err) {
      console.error("contract call failure", err);
    }
  };

  return (
    <div
      className="relative flex h-screen w-screen flex-col bg-black md:items-center md:justify-center md:bg-transparent"
      style={{
        backgroundImage: `url("https://rb.gy/p2hphi")`,
        backgroundSize: "fill",
      }}
    >
      <Head>
        <title>Netflix</title>
        <link rel="icon" href="/favicon.ico" />
      </Head>

      <img
        src="https://rb.gy/ulxxee"
        className="absolute left-4 top-4 cursor-pointer object-contain md:left-10 md:top-6"
        width={150}
        height={150}
        alt="logo"
      />

      <form className="relative space-y-8 rounded bg-black/60 py-10 px-6 md:mt-0 md:max-w-md md:px-14">
        <h1 className="text-4xl font-semibold">Sign In</h1>
        <div className="space-y-4">
          <label className="inline-block w-full">
            <input
              type="email"
              placeholder="Email"
              className="input p-2 w-full"
            />
          </label>
          <label className="inline-block w-full">
            <input
              type="password"
              placeholder="Password"
              className="input p-2 w-full"
            />
          </label>
        </div>

        <button
          className="w-full rounded bg-[#E50914] py-3 font-semibold"
          onClick={() => setLogin(true)}
        >
          Log In
        </button>

        <div className="text-[gray]">
          New to Netflix?{"  "}
          <button
            type="submit"
            className="cursor-pointer text-white hover:underline"
            onClick={() => setLogin(false)}
          >
            Sign up now
          </button>
        </div>

        <Dialog>
          <DialogTrigger asChild>
            <button
              className="w-full rounded bg-[#E50914] py-3 font-semibold"
              onClick={() => setLogin(true)}
            >
              Continue with MaskD
            </button>
          </DialogTrigger>
          <DialogContent className="sm:max-w-[425px]">
            <DialogHeader>
              <DialogTitle>Auth with MaskD</DialogTitle>
              <DialogDescription>
                Upload proof to Authenticate you to Neftlix
              </DialogDescription>
            </DialogHeader>
            <div className="grid gap-4 py-4">
              <div className="grid grid-cols-4 items-center gap-4">
                <Label htmlFor="file">Pick a file</Label>
                <Input id="file" type="file" className="col-span-3" />
              </div>
            </div>
            <DialogFooter>
              <Button type="submit">Submit</Button>
            </DialogFooter>

            <h2 className="text-center font-bold">or</h2>

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
                value={`[
                        "0x24322689311b668d576bf3f6e9316adfb185909a2ddb0439c5237bd12c49074d",
                        "0x2468dfbe011207684edc317b09cab426ae7948bcfa2308454b99e02770563ad6"
                      ],
                     [
                        [
                          "0x2e8e021471a8d5be1e35153ad4ae23f80a07ae66ec7e6b873fb86b67b93828d7",
                          "0x187a61fc6af9d0a78d9692586735b7d24b88d3970e589e853d6598b57fea41b8"
                        ],
                        [
                          "0x2084e38812b27d2917c032eb862ebebe1d8b0cb8a992e3b5d986dbc02b13a1cc",
                          "0x1dacb5a9b1c394e925a9b917aa7f965cd188f9ab09c40f63dada11712dabfbc9"
                        ]
                      ],
                      [
                        "0x0ec967afe3bf4853949f156f8cb798177606a959312bd7de8c1d94bbb0105f38",
                        "0x1f30e3c04b8e885ba018b3e858fe604bca8e8a935db867839a3d6e238493ab95"
                      ]
                    },
                   [
                      "0x000000000000000000000000000000003d1544488bcac09a9dae42f372cde43b",
                      "0x00000000000000000000000000000000e537da03823f3eb9c10227a51dbbcfb4"
                    ]
                  }`}
                viewBox={`0 0 256 256`}
              />
            </div>
          </DialogContent>
        </Dialog>
      </form>
    </div>
  );
}

export default Login;
