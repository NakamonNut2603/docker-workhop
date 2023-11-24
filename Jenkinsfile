pipeline {
    agent none
    stages {
        stage('Build Docker Image') {
            steps {
                sh 'docker build -t nakamonnut/nestjs-app-image -f ./Dockerfile .'
            }
        }
        stage('Push image to docker') {
            steps{
                script {
                    
                }
            }   
        }
    }
}