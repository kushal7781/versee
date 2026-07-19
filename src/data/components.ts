import { PCComponent } from "@/types/configurator";
import generatedCPUs from "./generated_cpus.json";
import generatedGPUs from "./generated_gpus.json";
import generatedComponents from "./generated_components.json";

export const dummyComponents: PCComponent[] = [
  ...(generatedCPUs as PCComponent[]),
  ...(generatedGPUs as PCComponent[]),
  ...(generatedComponents as PCComponent[])
];
