Rails.application.config.middleware.insert_before 0, Rack::Cors do
    allow do
      origins "localhost:8000", "clickollector-4d5bda395d4c.herokuapp.com"

      resource "*",
        headers: :any,
        methods: [:get, :post, :put, :patch, :delete, :options, :head]
    end
  end