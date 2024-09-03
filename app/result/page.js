"use client";

import { useEffect, useState } from "react";
import { useRouter } from "next/navigation";
import getStripe from "@/utils/get-stripe";
import { useSearchParams } from "next/navigation";
import { Container, Typography, CircularProgress } from "@mui/material";
import HeaderBar from "../components/HeaderBar";

const ResultPage = () => {
  const router = useRouter();
  const searchParams = useSearchParams();
  const sessionId = searchParams.get("session_id");

  const [loading, setLoading] = useState(false);
  const [session, setSession] = useState(null);
  const [error, setError] = useState(null);

  useEffect(() => {
    const fetchCheckoutSession = async () => {
      if (!sessionId) return;
      try {
        const res = await fetch(
          `/api/checkout_session?session_id=${sessionId}`
        );
        const sessionData = await res.json();
        if (res.ok) {
          setSession(sessionData);
        } else {
          setError(sessionData.error);
        }
      } catch (error) {
        setError("An error occured", error.message);
      } finally {
        setLoading(false);
      }
    };
    fetchCheckoutSession();
  }, [sessionId]);

  if (loading || !session) {
    return (
      <>
        <HeaderBar />
        <Container
          maxWidth="100vw"
          sx={{
            textAlign: "center",
            mt: 4,
          }}
        >
          <CircularProgress />
          <Typography variant="h6">Loading...</Typography>
        </Container>
      </>
    );
  }
  if (error) {
    return (
      <>
        <HeaderBar />
        <Container
          maxWidth="100vw"
          sx={{
            textAlign: "center",
            mt: 4,
          }}
        >
          <Typography variant="h6">{error}</Typography>
        </Container>
      </>
    );
  }

  return session && session.payment_status === "paid" ? (
    <>
      <HeaderBar />
      <Container
        maxWidth="100vw"
        sx={{
          textAlign: "center",
          mt: 4,
        }}
      >
        {session.payment_status === "paid" && (
          <Typography variant="h6">Get ready to Get Overfit!</Typography>
        )}
        <Typography variant="h6">
          Your payment was successful! Your order number is {session.id}.
        </Typography>
      </Container>
    </>
  ) : null;
};

export default ResultPage;
