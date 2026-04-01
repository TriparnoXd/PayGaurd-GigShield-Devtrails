# 🤖 GigShield AI Agent Execution Guide

This document outlines the strict protocol for guiding an AI agent through the GigShield development phases. The core philosophy is to manage the agent's context window tightly, enforce strict boundaries between phases, and demand verification before moving forward.

## 1. The Context Window Diet (Do Not Feed It Everything)

If you provide the entire roadmap at once, the agent will hallucinate features from Phase 5 while setting up Phase 0. 

* **The Fix:** Create a "System Prompt" that establishes the tech stack (React Native, Express, Supabase, Redis, FastAPI), but **only feed it one phase at a time.** * **Set Boundaries:** Explicitly instruct the agent on what *not* to do. For example: *"Do not write any frontend code yet. We are strictly working on the Express backend for Phase 1."*

## 2. Define Strict API & Data Contracts First

AI agents hallucinate when they have to invent data structures. Before starting Phase 1, dictate exactly what the database looks like. 

* **Provide Exact Schemas:** Define the exact columns for the `workers` table (e.g., `worker_id`, `platform`, `wallet_address`), the `policies` table, and the `claims` table.
* **Provide API Payloads:** Define the exact inputs and outputs. *"The `POST /workers` endpoint must accept exactly this JSON: `{...}` and return this JSON: `{...}`."*

## 3. Enforce the "Fake It Till You Make It" Rule

AI agents often overcomplicate early stages. If you mention "OpenWeather API" in Phase 2, the agent will waste time trying to import weather libraries and handle API keys instead of building the core flow.

* **The Prompt Strategy:** *"For this step, hardcode a mock function `checkTriggerStatus()` that randomly returns `true` 50% of the time. Do not integrate any external APIs. Just ensure the Redis queue picks up the `true` event."*

## 4. Demand Verification Checkpoints

Never let the agent move to the next phase without proving the current one works. An agent will happily write 500 lines of broken code if left unchecked.

* **The Prompt Strategy:** *"Before we move to Phase 3, write the exact `curl` commands I need to run in my terminal to test `POST /policies` and `GET /claims/:workerId` against my local Express server."*
* **Correction Loop:** If the `curl` command fails, feed the exact terminal error back to the agent before asking for any new features.

## 5. Isolate the ML Service (FastAPI)

Python/FastAPI and Node/Express have very different paradigms. If your agent is working in the same chat session for both, it will likely mix syntax or context.

* **The Fix:** Open a fresh chat session or a new agent instance specifically for Phase 4. 
* **The Prompt Strategy:** *"You are building a standalone FastAPI microservice that accepts a JSON payload, calculates a dynamic premium using a mock algorithm, and returns a JSON response. It will be called by an external Express backend."*

---

## 📋 Copy-Paste Prompt Template

*When you are ready to start a new phase, copy this structure, fill in the brackets, and send it to your agent.*

**Role:** You are an expert full-stack developer helping me build a system with React Native, Node/Express, Supabase, Redis, and FastAPI.

**Current State:** [e.g., Phase 0 is done. Express and Supabase are running locally.]

**Current Task:** We are executing Phase 1 (Basic Skeleton).

**Instructions:**
1. Write the SQL to create the `workers`, `policies`, and `claims` tables in Supabase. [Insert your specific column requirements here].
2. Create the Express routes for `POST /workers`, `POST /policies`, and `GET /claims/:workerId`.
3. Use mock data for all database inserts and responses.

**Constraints:** * Do NOT write any frontend code. 
* Do NOT implement Redis or external APIs yet. 
* Keep logic strictly to handling the requests and returning mock JSON.

**Output:** Provide the SQL script, the Express route code, and the exact `curl` commands I need to test these endpoints in my terminal.