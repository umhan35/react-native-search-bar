#import <UIKit/UIKit.h>
#import <React/RCTComponent.h>

@class RCTEventDispatcher;

@interface RNSearchBar : UISearchBar

- (instancetype)initWithEventDispatcher:(RCTEventDispatcher *)eventDispatcher NS_DESIGNATED_INITIALIZER;

<<<<<<< HEAD:ios/RNSearchBar.h
@property(nonatomic) BOOL _jsShowsCancelButton;
@property(nonatomic, copy) RCTBubblingEventBlock onSearchButtonPress;
@property(nonatomic, copy) RCTBubblingEventBlock onCancelButtonPress;

=======
>>>>>>> Added controlled cancel button:RNSearchBar.h
@end
