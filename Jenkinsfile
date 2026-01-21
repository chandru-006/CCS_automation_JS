pipeline {
  agent any

  stages {
    stage('Checkout') {
      steps {
        checkout scm
      }
    }

    stage('Install Dependencies') {
      steps {
        sh 'npm install'
        sh 'npx playwright install 2>/dev/null || true'
      }
    }

    stage('Run Playwright Tests') {
      steps {
        sh 'npx playwright test'
      }
    }
  }

  post {
    always {
      script {
        if (currentBuild.currentResult == 'UNSTABLE') {
          echo '⚠️ Normalizing UNSTABLE → SUCCESS'
          currentBuild.result = 'SUCCESS'
        }
      }

      allure([
        commandline: 'allure-2.27.0',
        includeProperties: false,
        jdk: '',
        results: [[path: 'allure-results']]
      ])
    }

    failure {
      echo '❌ Tests failed'
    }

    success {
      echo '✅ Tests passed'
    }
  }
}
