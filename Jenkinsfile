pipeline {
    agent any
    stages {
        stage('Build Docker Image') {
            steps {
                sh 'echo "Build Docker Image"'
                sh 'docker build -t nakamonnut/nestjs-app-image -f ./Dockerfile .'
            }
        }
        stage('Push image to docker') {
            steps{
                script {
                    sh 'echo "Push Image to Docker Hub"'
                    sh 'docker push nakamonnut/nestjs-app-image'
                }
            }   
        }
    }
}