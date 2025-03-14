pipeline {
    agent any
    
    environment {
        NODE_VERSION = '20.x'
        SSH_USER = 'user'
        SSH_SERVER = 'your-server'
        PROJECT_PATH = '/path/to/project'
    }

    stages {
        stage('Checkout Code') {
            steps {
                checkout scm
            }
        }

        stage('Setup Node') {
            steps {
                script {
                    def nodeHome = tool name: 'NodeJS', type: 'jenkins.plugins.nodejs.tools.NodeJSInstallation'
                    env.PATH = "${nodeHome}/bin:${env.PATH}"
                    sh "nvm install $NODE_VERSION"
                    sh "nvm use $NODE_VERSION"
                }
            }
        }

        stage('Install and Build') {
            steps {
                sh '''
                # Install dependencies and build client
                cd client
                npm ci
                npm run build

                # Install dependencies and build server
                cd ../server
                npm ci
                npm run build
                '''
            }
        }

        stage('Test') {
            steps {
                sh '''
                cd client
                npm test || true

                cd ../server
                npm test || true
                '''
            }
        }

        stage('Deploy') {
            steps {
                sshagent(['your-ssh-credentials-id']) {
                    sh '''
                    ssh $SSH_USER@$SSH_SERVER 'bash -s' << 'EOF'
                        set -e
                        cd $PROJECT_PATH

                        # Fetch the latest code and reset
                        git fetch origin main
                        git reset --hard origin/main

                        # Deploy client
                        cd client
                        npm ci --production
                        npm run build
                        pm2 reload client || pm2 start npm --name "client" -- run start

                        # Deploy server
                        cd ../server
                        npm ci --production
                        npm run build
                        pm2 reload server || pm2 start npm --name "server" -- run start
                    EOF
                    '''
                }
            }
        }
    }

    post {
        success {
            echo '✅ Deployment successful!'
        }
        failure {
            echo '❌ Deployment failed!'
        }
    }
}
