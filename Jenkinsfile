pipeline {
    agent any

    stages {
        stage('Navigate to Client Folder') {
            steps {
                script {
                    dir('client') {
                        sh 'pwd'
                        sh 'npm install'
                        sh 'npm run build'
                    }
                }
            }
        }
    }
}
