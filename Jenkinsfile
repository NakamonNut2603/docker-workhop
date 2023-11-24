pipeline {
    agent any
    stages {
        stage('Build Docker Image') {
            steps {
                script {
                    app = docker.build("nakamonnut/nestjs-app-image")
                }
            }
        }
        stage('Push image to docker') {
            script {
                docker.withRegistry('https://registry.hub.docker.com', 'git') {            
                    app.push("${env.BUILD_NUMBER}")            
                    app.push("latest")        
                }
            }
        }
    }
}