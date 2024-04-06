CREATE TABLE "user" (
  "id" SERIAL PRIMARY KEY,
  "walletAddress" VARCHAR(255) UNIQUE,
  "createdAt" TIMESTAMP DEFAULT CURRENT_TIMESTAMP,
  "updatedAt" TIMESTAMP DEFAULT CURRENT_TIMESTAMP
);

CREATE TABLE "position" (
  "id" SERIAL PRIMARY KEY,
  "protocolId" INT,
  "portfolioId" INT,
  "url" VARCHAR(255),
  "positionName" VARCHAR(255),
  "network" VARCHAR(255),
  "amountUSD" DECIMAL(10, 2),
  "dailyEarn" DECIMAL(10, 2),
  "dailyAPR" DECIMAL(10, 2),
  "weeklyAPR" DECIMAL(10, 2),
  "tokens" JSON,
  "userId" INT,
  "createdAt" TIMESTAMP DEFAULT CURRENT_TIMESTAMP,
  "updatedAt" TIMESTAMP DEFAULT CURRENT_TIMESTAMP,
  FOREIGN KEY ("userId") REFERENCES "user"("id")
);

CREATE TABLE "comparison" (
  "id" SERIAL PRIMARY KEY,
  "protocolId" INT,
  "position1Id" INT,
  "position2Id" INT,
  "positionName" VARCHAR(255),
  "network" VARCHAR(255),
  "diffAmountUSD" DOUBLE PRECISION NOT NULL,
  "diffTime" INT,
  "amountUSD" DOUBLE PRECISION NOT NULL,
  "userId" INT,
  "createdAt" TIMESTAMP DEFAULT CURRENT_TIMESTAMP,
  "updatedAt" TIMESTAMP DEFAULT CURRENT_TIMESTAMP,
  FOREIGN KEY ("userId") REFERENCES "user"("id")
);

CREATE TABLE "protocol" (
  "id" SERIAL PRIMARY KEY,
  "title" VARCHAR(255),
  "url" VARCHAR(255),
  "description" TEXT,
  "TVL" DOUBLE PRECISION NOT NULL,
  "network" VARCHAR(255),
  "tokens" VARCHAR(255),
  "startDate" DATE,
  "numberOfAudits" INT,
  "numberOfParticipants" INT,
  "isPool" BOOLEAN,
  "createdAt" TIMESTAMP DEFAULT CURRENT_TIMESTAMP,
  "updatedAt" TIMESTAMP DEFAULT CURRENT_TIMESTAMP
);

CREATE TABLE "portfolio" (
  "id" SERIAL PRIMARY KEY,
  "createdAt" TIMESTAMP DEFAULT CURRENT_TIMESTAMP,
  "updatedAt" TIMESTAMP DEFAULT CURRENT_TIMESTAMP,
  "userId" INT,
  "data" JSON,
  FOREIGN KEY ("userId") REFERENCES "user"("id")
);

CREATE TABLE "alternative" (
  "id" SERIAL PRIMARY KEY,
  "positionId" INT,
  data JSONB,
  "createdAt" TIMESTAMP DEFAULT CURRENT_TIMESTAMP,
  "updatedAt" TIMESTAMP DEFAULT CURRENT_TIMESTAMP,
  FOREIGN KEY ("positionId") REFERENCES "position"("id")
);

CREATE INDEX "IDX_USER_WALLET_ADDRESS" ON "user"("walletAddress");