"use client";

import { Button } from "../ui/button";
import {
  Card,
  CardContent,
  CardDescription,
  CardFooter,
  CardHeader,
  CardTitle,
} from "../ui/card";
import { Input } from "../ui/input";
import { Label } from "../ui/label";
import {
  Select,
  SelectContent,
  SelectItem,
  SelectTrigger,
  SelectValue,
} from "../ui/select";
import { Textarea } from "../ui/textarea";

export default function UploadImageCard() {
  return (
    <Card>
      <CardHeader>
        <CardTitle>Upload Image</CardTitle>
        <CardDescription>Give an image for 1:1 aspect ratio</CardDescription>
      </CardHeader>
      <CardContent className="grid gap-6">
        <div className="grid gap-2">
          <Button variant={"secondary"} className="py-40">
            Upload Image
          </Button>
        </div>
      </CardContent>
      <CardFooter className="justify-between space-x-2">
        <Button>Mint</Button>
      </CardFooter>
    </Card>
  );
}
