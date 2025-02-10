-- MySQL dump 10.13  Distrib 8.0.40, for Win64 (x86_64)
--
-- Host: localhost    Database: board_db
-- ------------------------------------------------------
-- Server version	8.0.40

/*!40101 SET @OLD_CHARACTER_SET_CLIENT=@@CHARACTER_SET_CLIENT */;
/*!40101 SET @OLD_CHARACTER_SET_RESULTS=@@CHARACTER_SET_RESULTS */;
/*!40101 SET @OLD_COLLATION_CONNECTION=@@COLLATION_CONNECTION */;
/*!50503 SET NAMES utf8 */;
/*!40103 SET @OLD_TIME_ZONE=@@TIME_ZONE */;
/*!40103 SET TIME_ZONE='+00:00' */;
/*!40014 SET @OLD_UNIQUE_CHECKS=@@UNIQUE_CHECKS, UNIQUE_CHECKS=0 */;
/*!40014 SET @OLD_FOREIGN_KEY_CHECKS=@@FOREIGN_KEY_CHECKS, FOREIGN_KEY_CHECKS=0 */;
/*!40101 SET @OLD_SQL_MODE=@@SQL_MODE, SQL_MODE='NO_AUTO_VALUE_ON_ZERO' */;
/*!40111 SET @OLD_SQL_NOTES=@@SQL_NOTES, SQL_NOTES=0 */;

--
-- Table structure for table `post`
--

DROP TABLE IF EXISTS `post`;
/*!40101 SET @saved_cs_client     = @@character_set_client */;
/*!50503 SET character_set_client = utf8mb4 */;
CREATE TABLE `post` (
  `post_id` int NOT NULL AUTO_INCREMENT,
  `user_id` varchar(20) COLLATE utf8mb3_bin NOT NULL,
  `title` varchar(255) COLLATE utf8mb3_bin NOT NULL,
  `content` text COLLATE utf8mb3_bin NOT NULL,
  `created_at` datetime DEFAULT CURRENT_TIMESTAMP,
  PRIMARY KEY (`post_id`)
) ENGINE=InnoDB AUTO_INCREMENT=33 DEFAULT CHARSET=utf8mb3 COLLATE=utf8mb3_bin;
/*!40101 SET character_set_client = @saved_cs_client */;

--
-- Dumping data for table `post`
--

LOCK TABLES `post` WRITE;
/*!40000 ALTER TABLE `post` DISABLE KEYS */;
INSERT INTO `post` VALUES (1,'MMMㅇ','[Node.js] mysql2/promise 사용법ㅇ','DB는 파일 시스템과 더불어 데이터를 저장하는 도구 중 가장 유용한 도구입니다. 데이터를 탐색, 조작, 관리하는데 탁월합니다. 이와 더불어 SQL 언어까지 사용해 조작할 수도 있습니다. 이 글에서는 이 DB와 SQL을 정의하고, Node.JS를 통해 DB에 접근하는 예시도 보여주겠습니다.ㅇ','2025-01-22 16:10:52'),(2,'ppwqenm','DB와 SQL 정의 및 Node.js 사용 예시','관계형 DB를 관리하기 위한 표준 언어. SQL을 사용해 DB에 데이터를 삽입, 조회, 수정, 삭제 가능.\n원자성(Atomicity): 트랜잭션의 모든 연산이 완전히 수행되거나 전혀 수행되지 않아야 함.\n일관성(Consistency): 트랜잭션이 성공적으로 완료되면 일관된 데이터베이스 상태가 되어야 함.\n고립성(Isolation): 하나의 트랜잭션이 완료되기 전까지 다른 트랜잭션은 그 결과를 참조 불가능.(순차)\n지속성(Durability): 트랜잭션이 성공적으로 완료되면 그 결과는 영구적으로 반영.','2025-01-22 16:10:55'),(3,'김성혁','리액트(React)를 왜 사용해야 할까?','웹 개발에 React.js를 사용하는 주요 이유 중 하나는 라이브러리에 최적화된 개발 인터페이스와 코딩 언어 때문입니다. 빠른 성능으로 강화된 가벼운 React API는 신속한 개발 워크플로우를 구현합니다. React 구성 요소와 개념은 이해하기 쉬우므로 이 부분에 대한 러닝 커브가 높지 않습니다.\n\nVue나 Angular 같은 다른 인기 프레임워크와 달리 불필요한 HTML 어트리뷰트(기존 프레임워크와 JS 라이브러리 솔루션의 표준 방식으로 JavaScript를 HTML에 ‘끼워 넣기‘할 때 생성됨)가 없습니다. 결과적으로 React는 JSX를 JavaScript에 넣음으로써(말 그대로 거꾸로) 훨씬 간결하고 가독성이 뛰어나며 포괄적인 코드를 제공합니다.','2025-02-03 13:50:08'),(4,'MAX000','[Next.js] 응답 완료 시 다른 페이지로 이동하기','Next에서 너무나 자연스럽게 useNavigate를 쓰려고 했다 될리가 없다!\n\nNext에서 다른 페이지로 navigate 시키는 방법에는 Link와 Router가 있는데, 버튼 누르면 이동하는 Link식이 아니라 axios 요청이 완료되면 자동으로 이동시키게 하려고 Router를 이용했다. \n\nuseNavigate와 같이 임포트 후 선언해서 사용하면 됨','2025-02-03 13:50:51'),(5,'ghkdu2','[NextJS] NextJs의 라우팅','- 정적 라우팅\n파일을 생성하고 파일의 내용을 다음과 같이 구성한다면 \"/about\"으로 접근했을 때 h1 태그로 the About Page라는 문구를 확인할 수 있다.\n이렇게 바로 파일을 생성하는 방법이 있고 폴더를 생성하는 방법도 존재한다. 폴더를 생성해나가면서 폴더명이 루트가 되고 폴더 내부의 index.js 파일이 원하는 주소로 접근했을 때 보여지는 Page Component가 된다.\n\n- 동적 라우팅\nnext의 router에서 useRouter를 사용하면 되는데 이때 query메서드를 사용할 수 있다. 브라우저에서 \"/about/jongbin\"으로 접근하여 개발자도구를 사용하여 콘솔값을 확인해 보면 다음과 같이 출력된다. 추가적으로 동적라우팅을 중복해서 할 수 있다. 폴더 명을 []을 사용해서 넣어줌으로서 동적라우팅도 가능하기 때문에 이를 이용한다. 이때 사용되는 []안에 들어가는 값은 중복되서는 안된다!','2025-02-03 14:05:17'),(8,'masibasi','[react] async/await을 쓰는 이유','동기(Synchronous) 작업:\n동기 작업은 순차적으로 실행되며, 이전 작업이 완료될 때까지 다음 작업이 실행되지 않습니다. setState를 예로 들어보겠습니다. setState는 React 컴포넌트의 상태를 변경하는 메서드입니다. 일반적으로 setState를 호출하면 해당 상태 업데이트는 동기적으로 처리됩니다.\n\n비동기(Asynchronous) 작업:\n비동기 작업은 순차적으로 실행되지 않고, 작업이 완료되지 않은 상태에서 다음 작업이 실행될 수 있습니다. axios를 예로 들어보겠습니다. axios는 네트워크 요청을 보내는 데 사용되는 JavaScript 라이브러리입니다.\naxios를 사용하여 데이터를 가져올 때는 비동기 작업을 수행하며, 응답이 도착하기 전까지 다른 작업을 진행할 수 있습니다.','2025-02-04 17:26:02'),(10,'Yoomin Kang','리액트 Reconciliation 알아보기','Render phase는 현재 트리에서 상태 변경이 발생하면 시작되며, beginWork와 completeWork의 두 단계로 나뉜다.\n\n여기서부터 “현재 트리”와 “작업용 트리”라는 말이 등장할 것이다. 둘을 헷갈리지 않도록 유의하자.\n\nbeginWork는 작업용 트리에 있는 Fiber node의 업데이트 필요 여부를 나타내는 플래그를 설정하고, 다음 Fiber node로 이동하여 트리의 맨아래에 도달할 때까지 같은 과정을 반복하는(아래 방향으로 순회하는) 단계이다.\n\nbeginWork가 완료되면 Fiber node에서 completeWork를 호출하고, 다시 거슬러 올라가며 순회한다.\n\ncompleteWork는 작업용 Fiber node에 대해 Effect list를 설정해 Commit phase에서 실행될 작업을 준비한다.\n\n여기서 중요한 점은, 이 화면은 중단될 수 있다는 점이다. 우선순위가 더 높은 업데이트가 예약되면 이 UI는 버려질 수 있다. 이것이 Fiber reconciler의 핵심이다.\n\nbeginWork와 completeWork의 시그니처는 다음과 같다.','2025-02-05 17:28:53'),(14,'hyobin','프론트엔드 강사가 알려주는 브라우저 렌더링','1. HTML 파싱 및 DOM 트리 생성\n브라우저는 먼저 HTML 파일을 읽고 DOM 트리를 생성합니다.\nDOM 트리는 HTML 문서를 계층적으로 표현한 트리구조로, HTML 문서의 각 요소(태그), 속성, 텍스트는 DOM 트리에서 하나의 노드로 표현됩니다. 이 트리구조 덕분에, 부모-자식, 형제 노드 간의 관계를 파악할 수 있으며, 쉽게 요소를 탐색하거나 수정할 수 있습니다.\n\n2. CSS 파싱 및 CSSOM 트리 생성\nHTML을 파싱해 DOM 트리를 생성했다면, 이제 브라우저는 CSS 파일을 읽어 CSSOM(CSS Object Model) 트리를 생성합니다. CSSOM은 브라우저가 CSS를 파싱하여 트리 구조로 표현한 객체 모델로, HTML 문서의 각 요소에 적용된 CSS 스타일 규칙을 나타내며, DOM과 결합해 화면에 표현될 준비를 합니다.\n\n3. 렌더 트리 형성\nCSS를 파싱해 CSSOM까지 생성했다면, 브라우저는 이제 DOM과 CSSOM을 결합해 렌더 트리(Render Tree)를 생성합니다. 렌더 트리는 화면에 표시될 요소들만 포함하고 있으며, 각 요소에 적용될 스타일과 위치에 대한 정보를 담고 있습니다.\n\n4. 레이아웃\n렌더 트리가 생성되면 브라우저는 각 요소의 위치와 크기를 계산하는 레이아웃(Layout) 단계에 들어갑니다. 이 과정에서는 요소가 화면에서 어디에 위치할지, 그리고 어떤 크기를 가질지 등을 결정합니다.\n\n5. 페인트\n레이아웃 단계 이후, 브라우저는 요소의 스타일과 내용을 바탕으로 화면에 픽셀을 그립니다. 이 단계를 페인트(Paint) 단계라고 부르며, 레이아웃 단계에서 계산된 요소들의 위치와 크기를 참고해, 각 요소에 적용된 스타일 속성(색상, 텍스트, 그림자, 테두리 등)을 시각적으로 표현합니다. 즉, 브라우저는 각 요소의 시각적인 속성을 기반으로 픽셀 데이터를 생성하며, 데이터들은 화면에 표시될 준비를 하는 단계입니다.\n\n페인트 과정에서 브라우저는 각 요소의 시각적인 속성을 기반으로 페인트 레이어(Paint Layer)를 생성하는데요. 요소들의 특정 속성 (z-index, position, opacity, <video>, <canvas> 등)에 따라 독립적인 레이어가 생성될 수 있습니다.\n\n6. 컴포지팅\n페인트 과정에서 생성된 여러 개의 레이어들은 컴포지팅(Compositing) 단계에서 하나의 화면으로 결합됩니다. 브라우저는 각 레이어를 올바른 순서로 합성해 화면에 정확히 렌더링합니다. 특히 요소가 겹치는 경우, z-index나 position과 같은 속성을 고려해 겹침 순서를 정확히 처리합니다. 여러 레이어들이 하나로 합쳐지는 과정은 아래의 그림을 보면 쉽게 이해할 수 있습니다.','2025-02-06 13:48:32'),(16,'Sonny','[번역] Node.js의 이벤트 루프','이 글에서는 이벤트 루프에 대해 깊이 있게 설명할 예정입니다. 혹시 여러분이 초보자임에도 이 내용을 이해할 수 있다면, 정말 대단하신 겁니다. 저 또한 시니어 엔지니어로서 이 글을 쓰면서 그간 제가 가지고 있던 여러 오해들을 바로잡는 데 큰 도움을 받았습니다. 자바스크립트의 이벤트 루프는 처음 배울 때부터 매우 추상적으로 다뤄지기 때문에, Node.js로 넘어올 때도 이러한 오해가 그대로 이어지기 쉽습니다. 게다가 인터넷에는 잘못된 다이어그램도 많아서, 잘못된 개념을 익히기가 더욱 쉬운 환경이기도 합니다.','2025-02-06 13:53:31'),(17,'김동혁','React, TypeScript, 그리고 Next.js로 완성하는','유지보수 용이성: 코드가 잘 정리되어 있어 버그 수정이나 기능 추가가 쉬워요.\n협업 효율성: 팀원들이 각자의 역할을 쉽게 이해하고 작업할 수 있어요.\n확장성: 프로젝트가 커져도 쉽게 관리할 수 있어요.\n\nNext.js는 React의 서버 사이드 렌더링(SSR)을 지원하는 프레임워크로, 자체적인 폴더 구조를 가지고 있어요. Next.js의 기본 폴더 구조는 다음과 같습니다:\npages/: 각 파일이 자동으로 라우트가 되는 폴더예요. pages/index.tsx는 / 경로가 되고, pages/about.tsx는 /about이 됩니다.\npublic/: 정적 파일을 보관하는 곳으로, 이미지나 폰트 등을 저장해요.\nstyles/: 글로벌 스타일과 모듈 CSS를 보관해요.\napi/: 서버리스 함수(API 라우트)를 작성하는 곳이에요.','2025-02-06 14:00:40'),(18,'taeheeyoon','Deepseek 모델 로컬 환경에서 사용하기','간단히 Ollama와 Deepseek를 연동해 로컬 환경에서 실험해본 과정을 공유했습니다. Distill된 모델과 일반 모델 간의 차이를 숙지하여, 자신의 하드웨어 스펙과 작업 목적에 맞는 모델을 선택하면 됩니다.\n\n특히 Deepseek가 무료 오픈소스로 제공된다는 점은 정말 놀랍습니다. 상용 서비스(예: ChatGPT)와 견줄 만한 수준의 성능을 무료로 활용할 수 있다는 것은 큰 장점입니다.\n\n이 글이 로컬 환경에서 Deepseek를 직접 시도해보고자 하는 분들께 도움이 되길 바라며 마치겠습니다.','2025-02-06 14:02:15'),(19,'Wonkook Lee','tailwindcss 4.0 무엇이 달라졌나요?','Tailwind CSS v4.0은 성능과 유연성을 극대화한 새로운 버전으로, 최신 웹 표준과 개발 흐름에 맞춘 다양한 기능과 개선 사항을 제공합니다. 이 글에서는 업데이트된 주요 내용을 살펴봅니다.\n\n먼저, 완전히 새롭게 설계된 고성능 엔진을 통해 전체 빌드 속도가 최대 5배, 증분 빌드 속도가 100배 이상 향상된 점을 다룹니다. 또한, CSS 레이어, 커스텀 속성(@property), color-mix() 등 최신 CSS 표준을 활용하여 더 간결하고 강력한 스타일링을 지원합니다.\n\n설치 과정은 더욱 간소화되어 의존성을 줄이고, 한 줄의 CSS로 바로 시작할 수 있습니다. 새로운 @starting-style과 not-* 변형, 컨테이너 쿼리 지원, 3D 변환 유틸리티 등 현대적인 웹 디자인을 구현할 수 있는 기능도 포함되었습니다.\n\n이외에도 P3 색상 팔레트, 확장된 그래디언트 API, 동적 유틸리티 값 등 개발자 경험을 크게 개선한 요소들을 소개합니다.','2025-02-06 14:05:39'),(22,'ㅇㅇㅁㄴㅇㅁㄴㅇ','ㅇㄷㅁㅇㅁㄴㅇㅁㄴ','ㅇㅁㄴㅇㅁㄴㅇㅁㅇㅁㅇ','2025-02-06 14:45:15'),(23,'1111','ㅇ1111','1111','2025-02-06 14:48:47'),(30,'이상민','Pandas 결측치 처리 DeepDive','① 결측값을 그대로 둔다\n예시: 기상 데이터에서 강수량 측정이 실패한 경우, 해당 값을 0으로 설정하면 왜곡될 수 있음.\n장점: 데이터의 원본 상태를 유지할 수 있음.\n단점: 모델이 결측값을 직접 처리하지 못할 경우 오류 발생 가능.\n\n② 행 또는 열을 삭제한다\n결측치가 포함된 행 또는 열을 제거하여 데이터의 품질을 높이는 방법.\n장점:\n데이터의 품질과 신뢰도를 향상시킬 수 있음.\n연산 속도 향상 및 메모리 비용 절감 가능.\n단점:\n데이터 손실이 발생할 수 있음.\n결측값이 많은 변수(열)를 삭제하면 중요한 정보를 잃을 수도 있음.\n삭제 여부를 결정하기 위해 결측치 비율 및 인과관계를 분석해야 함.\n\n③ 결측값을 대체한다 (Imputation)\n결측치를 특정 값으로 채우는 방법.\n다양한 기법이 있으며, 데이터의 성격에 따라 적절한 방법을 선택해야 함.','2025-02-07 11:12:56');
/*!40000 ALTER TABLE `post` ENABLE KEYS */;
UNLOCK TABLES;
/*!40103 SET TIME_ZONE=@OLD_TIME_ZONE */;

/*!40101 SET SQL_MODE=@OLD_SQL_MODE */;
/*!40014 SET FOREIGN_KEY_CHECKS=@OLD_FOREIGN_KEY_CHECKS */;
/*!40014 SET UNIQUE_CHECKS=@OLD_UNIQUE_CHECKS */;
/*!40101 SET CHARACTER_SET_CLIENT=@OLD_CHARACTER_SET_CLIENT */;
/*!40101 SET CHARACTER_SET_RESULTS=@OLD_CHARACTER_SET_RESULTS */;
/*!40101 SET COLLATION_CONNECTION=@OLD_COLLATION_CONNECTION */;
/*!40111 SET SQL_NOTES=@OLD_SQL_NOTES */;

-- Dump completed on 2025-02-10  9:40:48
