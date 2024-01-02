FROM node:18-slim AS builder

# Create app directory
WORKDIR /usr/src/app

# Install app dependencies
# A wildcard is used to ensure both package.json and package-lock.json are copied
# where available (npm@5+)
COPY package*.json ./

# If you are using yarn, copy the yarn.lock file as well
# COPY package.json yarn.lock ./

RUN npm install
# If you are using yarn, use the following command instead
# RUN yarn install

# Bundle app source
COPY . .
COPY .env ./

# Build the Next.js app
RUN npm run build
# If you are using yarn, use the following command instead
# RUN yarn build

# Stage 2: Run the application
FROM node:18-slim AS runner

WORKDIR /usr/src/app

# Copy package.json and package-lock.json
COPY package*.json ./
COPY .env ./

# Install production dependencies
RUN npm install --only=production
# If you are using yarn, use the following command instead
# RUN yarn install --production

# Copy the build from the previous stage
COPY --from=builder /usr/src/app/.next ./.next
COPY --from=builder /usr/src/app/public ./public
COPY --from=builder /usr/src/app/next.config.js .

# Your app binds to port 3000 by default
EXPOSE 3000

# Next.js collects completely anonymous telemetry data about general usage.
# Learn more here: https://nextjs.org/telemetry
# Uncomment the following line in case you want to disable telemetry.
# ENV NEXT_TELEMETRY_DISABLED 1

# Run the web service on container startup.
CMD ["npm", "start"]
# If you are using yarn, use the following command instead
# CMD ["yarn", "start"]
