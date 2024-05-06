FROM nginx:alpine

COPY ../../dist /usr/share/nginx/html
COPY ../../deployment/docker/nginx/nginx.conf /etc/nginx/conf.d/default.conf

# Copy .env file and shell script to container
WORKDIR /usr/share/nginx/html
COPY ../../deployment/docker/env.sh .
COPY ../../.env .

# Add bash
RUN apk add --no-cache bash

# Make our shell script executable
RUN chmod +x env.sh

CMD ["/bin/bash", "-c", "/usr/share/nginx/html/env.sh && nginx -g \"daemon off;\""]