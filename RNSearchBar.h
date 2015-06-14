#import <UIKit/UIKit.h>

@class RCTEventDispatcher;

@interface RNSearchBar : UISearchBar

- (instancetype)initWithEventDispatcher:(RCTEventDispatcher *)eventDispatcher NS_DESIGNATED_INITIALIZER;

@end
