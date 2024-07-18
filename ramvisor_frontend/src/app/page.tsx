"use client";

import { Suspense } from "react";

import { WelcomePage } from "@refinedev/core";
import { Authenticated } from "@refinedev/core";
import Login from "./login/page";
import Calendar from "@components/home/calendar";
import React from "react";
import '../styles/global.css';

export default function IndexPage() {
  return (
    
      <Calendar />
  );
}
