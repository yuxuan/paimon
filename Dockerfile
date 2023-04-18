FROM iregistry.baidu-int.com/ee-fe/base-node:18-alpine
WORKDIR /app
RUN addgroup -g 1001 -S nodejs && adduser -S nextjs -u 1001

COPY package.json .
COPY next.config.js .
COPY ./public ./public
COPY --chown=nextjs:nodejs ./node_modules ./node_modules
COPY --chown=nextjs:nodejs ./.next ./.next

ENV NODE_ENV production

USER nextjs

EXPOSE 8080

# Next.js collects completely anonymous telemetry data about general usage.
# Learn more here: https://nextjs.org/telemetry
# Uncomment the following line in case you want to disable telemetry.
ENV NEXT_TELEMETRY_DISABLED 1

CMD ["yarn", "start", "-p", "8080"]

