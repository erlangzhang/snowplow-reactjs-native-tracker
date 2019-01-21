pipeline {
    agent any

    tools { nodejs "nodejs-7.x" }

    parameters {
        booleanParam(name: 'SHOULD_PUBLISH', defaultValue: false, description: 'Should I also publish? (Only relevant for non-prod)')
    }

    environment {
        AWS_DEFAULT_REGION = 'eu-west-1'
    }

    stages {
        stage('Prepare') {
            failFast true
            steps {
                deleteDir()
                checkout scm
            }
        }

        stage('Build') {
            failFast true
            steps {
                sh 'npm install'
            }
        }

        stage('Test') {
            failFast true
            steps {
                sh 'npm test'
            }
        }

        stage('Deploy') {
            failFast true
            when {
                expression{
                    return  (params.SHOULD_PUBLISH || (env.ENVIRONMENT == 'prod' && env.BRANCH_NAME == 'master'))
                }
            }
            steps {
                script {
                    if (params.SHOULD_PUBLISH) {
                        sh 'npm publish --tag upcoming'
                    } else if (env.ENVIRONMENT == 'prod' && env.BRANCH_NAME == 'master') {
                        sh 'npm publish --tag latest'
                    }
                }
            }
        }
    }
}
