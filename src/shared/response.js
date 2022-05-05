export const RESP = {
  MAKEPLANPOST: {
    postId: 1,
    startDate: "2022-04-22",
    endDate: "2022-04-25",
    dateCnt: 2,
    title: "남자끼리 제주도 여행",
    location: "제주도",
    theme: "힐링",
    islike: false,
    status: 200,
  },
  IDCHECKPOST: {
    status: 200,
  },
  SIGNUPPOST: {
    status: 200,
  },
  LOGINPOST: {
    status: 200,
    token: "token",
  },
  ISLOGINGET: {
    status: 200,
    username: "mock@mock.com",
    nickName: "mock목목",
    profileImg:
      "https://img1.daumcdn.net/thumb/R1280x0/?scode=mtistory2&fname=https%3A%2F%2Fblog.kakaocdn.net%2Fdn%2FI416p%2FbtrATS65jRz%2F6UWDXOCXfH9Smqbzwg2LFK%2Fimg.png",
    totalLike: 0,
  },
  MAKEPLANGET: {
    postId: 1,
    startDate: "2022-04-22",
    endDate: "2022-04-25",
    dateCnt: 2,
    title: "남자끼리 제주도 여행",
    location: "제주도",
    theme: "힐링",
    status: 200,
  },
  SAVEPLANPUT: {
    status: 200,
  },
  GETPLANGET: {
    status: 200,
    userInfo: {
      username: "bkw9603@naver.com",
      nickName: "floww",
      profileImg:
        "https://img1.daumcdn.net/thumb/R1280x0/?scode=mtistory2&fname=https%3A%2F%2Fblog.kakaocdn.net%2Fdn%2FI416p%2FbtrATS65jRz%2F6UWDXOCXfH9Smqbzwg2LFK%2Fimg.png",
      totalLike: 5,
    },
    postList: [
      {
        postId: 1,
        postImg:
          "https://post-phinf.pstatic.net/MjAyMTA2MDNfMTYz/MDAxNjIyNjk2MjY1MTY5.1l_v6ss-3cvXMl_Rf03JOLZcnnlDedI0Byshqwkau2Ig.rni7aAK-vIdCF5IAXIvRYSKdQmfL8p67-FK_zjBl82Ig.PNG/20210531_155622.png?type=w1200",
        startDate: "2022-04-22",
        endDate: "2022-04-25",
        dateCnt: 4,
        title: "캠핑 감성 맛집여행",
        location: "부산",
        islike: true,
        ispublic: true,
        likeCnt: 20,
        theme: "맛집",
        allPlan: [],
      },
      {
        postId: 2,
        postImg:
          "https://file.mk.co.kr/meet/neds/2021/11/image_readtop_2021_1090983_16376407714859650.jpg",
        startDate: "2022-05-1",
        endDate: "2022-05-3",
        dateCnt: 3,
        title: "울릉도 등산코스",
        location: "울릉도",
        islike: true,
        ispublic: true,
        likeCnt: 1583,
        theme: "액티비티",
        allPlan: [],
      },
    ],
  },
  MYPAGELIKEGET: {
    status: 200,
    userInfo: {
      username: "bkw9603@naver.com",
      nickName: "mock목목",
      profileImg:
        "https://img1.daumcdn.net/thumb/R1280x0/?scode=mtistory2&fname=https%3A%2F%2Fblog.kakaocdn.net%2Fdn%2FI416p%2FbtrATS65jRz%2F6UWDXOCXfH9Smqbzwg2LFK%2Fimg.png",
      totalLike: 5,
    },
    postList: [
      {
        postId: 1,
        postImg:
          "https://post-phinf.pstatic.net/MjAyMTA2MDNfMTYz/MDAxNjIyNjk2MjY1MTY5.1l_v6ss-3cvXMl_Rf03JOLZcnnlDedI0Byshqwkau2Ig.rni7aAK-vIdCF5IAXIvRYSKdQmfL8p67-FK_zjBl82Ig.PNG/20210531_155622.png?type=w1200",
        startDate: "2022-04-22",
        endDate: "2022-04-25",
        dateCnt: 4,
        title: "찜하기 좋은여행",
        location: "경주",
        islike: true,
        ispublic: true,
        likeCnt: 20,
        theme: "맛집",
        allPlan: [],
      },
      {
        postId: 2,
        postImg:
          "https://file.mk.co.kr/meet/neds/2021/11/image_readtop_2021_1090983_16376407714859650.jpg",
        startDate: "2022-05-1",
        endDate: "2022-05-3",
        dateCnt: 3,
        title: "찜하기 좋은여행2",
        location: "여수",
        islike: true,
        ispublic: true,
        likeCnt: 1583,
        theme: "액티비티",
        allPlan: [],
      },
    ],
  },
  MYREVIEWGET: [
    {
      reviewId: 1,
      postId: 1,
      nickName: "mock목목",
      reviewComment: "정말 좋았어요",
      reviewImage: null,
      createdAt: "2022-05-05",
      modifiedAt: "2022-05-05",
    },
    {
      reviewId: 2,
      postId: 1,
      nickName: "mock목목",
      reviewComment: "정말 좋았어요2222",
      reviewImage:
        "https://file.mk.co.kr/meet/neds/2021/11/image_readtop_2021_1090983_16376407714859650.jpg",
      createdAt: "2022-05-07",
      modifiedAt: "2022-05-07",
    },
  ],
};
