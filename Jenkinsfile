pipeline {
    agent any
    stages {
        stage('Build Docker Image') {
            steps {
                app = docker.build("nakamonnut/nestjs-app-image")
            }
        }
        stage('Push image to docker') {
            docker.withRegistry('https://registry.hub.docker.com', 'git') {            
                app.push("${env.BUILD_NUMBER}")            
                app.push("latest")        
            }
        }
    }
}