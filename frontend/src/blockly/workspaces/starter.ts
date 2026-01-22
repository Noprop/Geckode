const starterWorkspace = {
  "blocks": {
    "languageVersion": 0,
    "blocks": [
      {
        "type": "onStart",
        "id": "starter_on_start",
        "x": 38,
        "y": 38,
        "inputs": {
          "INNER": {
            "block": {
              "type": "setProperty",
              "id": "z4a[C6klShqm`U-l0fmw",
              "fields": {
                "PROPERTY": "X"
              },
              "inputs": {
                "SPRITE": {
                  "shadow": {
                    "type": "spriteGhost",
                    "id": "}3iAKjT@3e?Hw+{6Tmg:",
                    "fields": {
                      "SPRITE": "id_1769104655700_9212"
                    }
                  }
                },
                "VALUE": {
                  "shadow": {
                    "type": "math_number",
                    "id": "+U9G~{QL^GpTe[y`7E{}",
                    "fields": {
                      "NUM": 240
                    }
                  }
                }
              },
              "next": {
                "block": {
                  "type": "setProperty",
                  "id": "QxT$/{}/evtm5ZKh9_HO",
                  "fields": {
                    "PROPERTY": "Y"
                  },
                  "inputs": {
                    "SPRITE": {
                      "shadow": {
                        "type": "spriteGhost",
                        "id": "$8b~%(L=m^9L!7Af+WK1",
                        "fields": {
                          "SPRITE": "id_1769104655700_9212"
                        }
                      }
                    },
                    "VALUE": {
                      "shadow": {
                        "type": "math_number",
                        "id": "Z}%{-%:[5=cicv*g=z*=",
                        "fields": {
                          "NUM": 180
                        }
                      }
                    }
                  }
                }
              }
            }
          }
        }
      },
      {
        "type": "onUpdate",
        "id": "ye5uu!NUDKm*tQtz#J;[",
        "x": 37,
        "y": 250,
        "inputs": {
          "INNER": {
            "block": {
              "type": "setProperty",
              "id": "_a:BM|tzU^Hig/3A0{J(",
              "fields": {
                "PROPERTY": "VelocityX"
              },
              "inputs": {
                "SPRITE": {
                  "shadow": {
                    "type": "spriteGhost",
                    "id": "$(/%(u`W(T#Qf2R(uh;K",
                    "fields": {
                      "SPRITE": "id_1769104655700_9212"
                    }
                  }
                },
                "VALUE": {
                  "shadow": {
                    "type": "math_number",
                    "id": "8=9s[:]l,/Ce`A%`+9,)",
                    "fields": {
                      "NUM": 0
                    }
                  }
                }
              },
              "next": {
                "block": {
                  "type": "setProperty",
                  "id": "Z|=S}`*{O1lcVNRFNQlB",
                  "fields": {
                    "PROPERTY": "VelocityY"
                  },
                  "inputs": {
                    "SPRITE": {
                      "shadow": {
                        "type": "spriteGhost",
                        "id": "V|~SqPlN]^abf:o[)?]x",
                        "fields": {
                          "SPRITE": "id_1769104655700_9212"
                        }
                      }
                    },
                    "VALUE": {
                      "shadow": {
                        "type": "math_number",
                        "id": "-2_hhE*~GOZc5XF*h`^b",
                        "fields": {
                          "NUM": 0
                        }
                      }
                    }
                  },
                  "next": {
                    "block": {
                      "type": "controls_if",
                      "id": "^LJRy*UK^YFM7qXEbQC^",
                      "inputs": {
                        "IF0": {
                          "shadow": {
                            "type": "logic_boolean",
                            "id": "W(9/Z$p3JvZ2|:=CM4*L",
                            "fields": {
                              "BOOL": "TRUE"
                            }
                          },
                          "block": {
                            "type": "keyPressed",
                            "id": "Y:`4yeOG/Ui6pHCG^]A%",
                            "fields": {
                              "KEY": "left"
                            }
                          }
                        },
                        "DO0": {
                          "block": {
                            "type": "setProperty",
                            "id": ",1P5h0J5twHpm-g$VCK/",
                            "fields": {
                              "PROPERTY": "VelocityX"
                            },
                            "inputs": {
                              "SPRITE": {
                                "shadow": {
                                  "type": "spriteGhost",
                                  "id": "/%6*l`Qd0fq!+w@7s=1|",
                                  "fields": {
                                    "SPRITE": "id_1769104655700_9212"
                                  }
                                }
                              },
                              "VALUE": {
                                "shadow": {
                                  "type": "math_number",
                                  "id": "T1^+.;{VOKH*bLb`H4k1",
                                  "fields": {
                                    "NUM": -500
                                  }
                                }
                              }
                            }
                          }
                        }
                      },
                      "next": {
                        "block": {
                          "type": "controls_if",
                          "id": "HYH{;3tx)rW+FYLTe9#C",
                          "inputs": {
                            "IF0": {
                              "shadow": {
                                "type": "logic_boolean",
                                "id": "W(9/Z$p3JvZ2|:=CM4*L",
                                "fields": {
                                  "BOOL": "TRUE"
                                }
                              },
                              "block": {
                                "type": "keyPressed",
                                "id": "IMczrXl+Qb9aIq=25YX$",
                                "fields": {
                                  "KEY": "right"
                                }
                              }
                            },
                            "DO0": {
                              "block": {
                                "type": "setProperty",
                                "id": "h%v4X=0.^NWf6*/}h*wP",
                                "fields": {
                                  "PROPERTY": "VelocityX"
                                },
                                "inputs": {
                                  "SPRITE": {
                                    "shadow": {
                                      "type": "spriteGhost",
                                      "id": "f{D{|DOQjfY?MZ~ECmF-",
                                      "fields": {
                                        "SPRITE": "id_1769104655700_9212"
                                      }
                                    }
                                  },
                                  "VALUE": {
                                    "shadow": {
                                      "type": "math_number",
                                      "id": ",/o,|GPBU;r+@W2d,q(y",
                                      "fields": {
                                        "NUM": 500
                                      }
                                    }
                                  }
                                }
                              }
                            }
                          },
                          "next": {
                            "block": {
                              "type": "controls_if",
                              "id": "+Q[Eom5,94}qq|]yVn}4",
                              "inputs": {
                                "IF0": {
                                  "shadow": {
                                    "type": "logic_boolean",
                                    "id": "W(9/Z$p3JvZ2|:=CM4*L",
                                    "fields": {
                                      "BOOL": "TRUE"
                                    }
                                  },
                                  "block": {
                                    "type": "keyPressed",
                                    "id": "$S#*VopOA$QRz1)Y$b!}",
                                    "fields": {
                                      "KEY": "up"
                                    }
                                  }
                                },
                                "DO0": {
                                  "block": {
                                    "type": "setProperty",
                                    "id": ",v#S~tV(BY+5+)!J499p",
                                    "fields": {
                                      "PROPERTY": "VelocityY"
                                    },
                                    "inputs": {
                                      "SPRITE": {
                                        "shadow": {
                                          "type": "spriteGhost",
                                          "id": "c@d/LE6sBQBst6KVFNQK",
                                          "fields": {
                                            "SPRITE": "id_1769104655700_9212"
                                          }
                                        }
                                      },
                                      "VALUE": {
                                        "shadow": {
                                          "type": "math_number",
                                          "id": "X}U~EVEIhy0@MDKPyglR",
                                          "fields": {
                                            "NUM": -500
                                          }
                                        }
                                      }
                                    }
                                  }
                                }
                              },
                              "next": {
                                "block": {
                                  "type": "controls_if",
                                  "id": "uV^0^lg[JX]7pR$AISs$",
                                  "inputs": {
                                    "IF0": {
                                      "shadow": {
                                        "type": "logic_boolean",
                                        "id": "W(9/Z$p3JvZ2|:=CM4*L",
                                        "fields": {
                                          "BOOL": "TRUE"
                                        }
                                      },
                                      "block": {
                                        "type": "keyPressed",
                                        "id": "rF@4:79Gl+X|!gp.qwg*",
                                        "fields": {
                                          "KEY": "down"
                                        }
                                      }
                                    },
                                    "DO0": {
                                      "block": {
                                        "type": "setProperty",
                                        "id": "T*w.2c@$MiLzx`Rf|Oj[",
                                        "fields": {
                                          "PROPERTY": "VelocityY"
                                        },
                                        "inputs": {
                                          "SPRITE": {
                                            "shadow": {
                                              "type": "spriteGhost",
                                              "id": "4Z)s1ZP3qwHyXBxz-dO[",
                                              "fields": {
                                                "SPRITE": "id_1769104655700_9212"
                                              }
                                            }
                                          },
                                          "VALUE": {
                                            "shadow": {
                                              "type": "math_number",
                                              "id": "JiPj_$/Do6+ZS8Ci=F}U",
                                              "fields": {
                                                "NUM": 500
                                              }
                                            }
                                          }
                                        }
                                      }
                                    }
                                  }
                                }
                              }
                            }
                          }
                        }
                      }
                    }
                  }
                }
              }
            }
          }
        }
      }
    ]
  }
}

export default starterWorkspace;
