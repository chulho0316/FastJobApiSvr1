class LoginDTO {
  constructor(userId, password) {
    this.userId = userId;
    this.password = password;
  }

  // 요청 데이터 전체를 받아 유효성 검사 → DTO 인스턴스 반환
  static isValid(data) {
    const { userId, password } = data;
    if (typeof userId !== 'string' || userId.length === 0) {
      throw new Error('userId가 없습니다.');
    }
    if (typeof password !== 'string' || password.length === 0) {
      throw new Error('password가 없습니다.');
    }
    return new LoginDTO(userId, password);
  }
}

module.exports = LoginDTO;